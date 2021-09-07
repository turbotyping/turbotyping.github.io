import { DELETE_PROGRESS_DATA_EVENT, END_TYPING_EVENT } from '../../constants/constant';
import { TypedKeyStats } from '../typed-keys/typed-key-stats.model';
import { TypingProgressGraphHtmlComponent } from './typing-progress-graph.component';
import { BaseHtmlComponent } from '../_core/base-component';
import { TypedKeysHighlighter } from './typed-keys-highlighter';
import { TypedKeysHtmlComponent, TYPED_KEY_CLASS } from '../typed-keys/typed-keys.component';
import { TypedTextStats } from '../typed-text-stats/typed-text-stats.model';
import { IAppStateClient } from '../../state/app-state.client.interface';
import { Color } from '../_core/color';
import { LabeledSwitchHtmlComponent } from '../_core/switch/labled-switch.component';

// const TYPED_KEYS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"{}()[]<>+-=,.;:';
const TYPED_KEYS = 'abcdefghijklmnopqrstuvwxyz';

export class TypingProgressHtmlComponent extends BaseHtmlComponent {
  private graph: TypingProgressGraphHtmlComponent;
  private smoothness: number = 0;
  private typedKeysProgressId: string;
  private progressByKeySwitch: LabeledSwitchHtmlComponent;
  private typedKeysProgress: HTMLElement;
  private typedKeys: TypedKeysHtmlComponent;
  private containerId: string;

  constructor(
    private appStateClient: IAppStateClient,
    private graphName: string,
    private typedTextsStatsToProgressData: (typedTextsStats: TypedTextStats[]) => number[],
    private typedKeysStatsToProgressData: (typedKeysStats: TypedKeyStats[]) => number[],
    private typedKeysHighlighter: TypedKeysHighlighter,
    private barColor: Color,
    private withAverageLine: boolean
  ) {
    super();
  }

  preInsertHtml(): void {
    this.containerId = this.generateId();
    this.typedKeysProgressId = this.generateId();
    this.graph = new TypingProgressGraphHtmlComponent(
      this.appStateClient,
      this.typedTextsStatsToProgressData(this.appStateClient.getAppState().typedTextsStats),
      this.smoothness,
      this.barColor,
      this.withAverageLine
    );
    this.typedKeys = new TypedKeysHtmlComponent(TYPED_KEYS, 'a');
    this.progressByKeySwitch = new LabeledSwitchHtmlComponent('By key', false);
    this.progressByKeySwitch.preInsertHtml();
    this.graph.preInsertHtml();
    this.typedKeys.preInsertHtml();
  }

  toHtml() {
    // prettier-ignore
    return /* html */ `
      <div id="${this.containerId}">
        <div class="progress-header">
          <span class="progress-name">${this.graphName}</span>
          <span class="progress-by-key">${this.progressByKeySwitch.toHtml()}</span>
        </div>
        <div id="${this.typedKeysProgressId}" class="typed-keys-progress">${this.typedKeys.toHtml()}</div>
        <div class="progress-body">
          ${this.graph.toHtml()}
        </div>
      </div>
    `;
  }

  postInsertHtml(): void {
    this.typedKeysProgress = document.getElementById(this.typedKeysProgressId);
    this.typedKeysProgress.classList.add('hide');
    this.graph.postInsertHtml();
    this.typedKeys.postInsertHtml();
    this.progressByKeySwitch.postInsertHtml();
    this.progressByKeySwitch.onUpdate(this.handleProgressByKeyUpdateEvent.bind(this));
    this.typedKeys.onClick((key) => this.handleSelectKey(key));
    this.addCustomEventListener(END_TYPING_EVENT, this.handleEndTypingEvent.bind(this));
    this.addCustomEventListener(DELETE_PROGRESS_DATA_EVENT, this.handleDeleteProgressDataEvent.bind(this));
    this.typedKeysHighlighter.highligh(this.typedKeysProgressId, TYPED_KEY_CLASS);
  }

  private handleProgressByKeyUpdateEvent(value: boolean) {
    if (value) {
      this.typedKeysProgress.classList.remove('hide');
      this.useTypedTextsStats();
    } else {
      this.typedKeysProgress.classList.add('hide');
      this.handleSelectKey('a');
    }
  }

  private handleSelectKey(key: string) {
    const keyLowercase = key.toLowerCase();
    this.typedKeys.selectKey(keyLowercase);
    const typedKeysStats = this.appStateClient.getTypedKeysStatsMap().get(keyLowercase) || [];
    this.graph.reset({ graphData: this.typedKeysStatsToProgressData(typedKeysStats) });
    this.typedKeysHighlighter.highligh(this.typedKeysProgressId, TYPED_KEY_CLASS);
  }

  private handleEndTypingEvent() {
    this.useTypedTextsStats();
  }

  private handleDeleteProgressDataEvent() {
    this.useTypedTextsStats();
  }

  private useTypedTextsStats() {
    this.graph.reset({ graphData: this.typedTextsStatsToProgressData(this.appStateClient.getAppState().typedTextsStats) });
  }
}
