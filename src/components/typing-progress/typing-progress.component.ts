import { DELETE_PROGRESS_DATA_EVENT, END_TYPING_EVENT } from '../../constants/constant';
import { TypedKeyStats } from '../typed-keys/typed-key-stats.model';
import { SliderHtmlComponent } from '../_core/slider/slider.component';
import { TypingProgressGraphHtmlComponent } from './typing-progress-graph.component';
import { BaseHtmlComponent } from '../_core/base-component';
import { TypedKeysHighlighter } from './typed-keys-highlighter';
import { TypedKeysHtmlComponent, TYPED_KEY_CLASS } from '../typed-keys/typed-keys.component';
import { TypedTextStats } from '../typed-text-stats/typed-text-stats.model';
import { SwitchHtmlComponent } from '../_core/switch/switch.component';
import { IAppStateClient } from '../../state/app-state.client.interface';

// const TYPED_KEYS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"{}()[]<>+-=,.;:';
const TYPED_KEYS = 'abcdefghijklmnopqrstuvwxyz';

export class TypingProgressHtmlComponent extends BaseHtmlComponent {
  private graph: TypingProgressGraphHtmlComponent;
  private byKeySwitch: SwitchHtmlComponent;
  private byKeySwitchValue: boolean;
  private slider: SliderHtmlComponent;
  private smoothness: number = 0;
  private typedKeysProgressId: string;
  private typedKeysProgress: HTMLElement;
  private typedKeys: TypedKeysHtmlComponent;
  private containerId: string;

  constructor(
    private appStateClient: IAppStateClient,
    private graphName: string,
    private typedTextsStatsToProgressData: (typedTextsStats: TypedTextStats[]) => number[],
    private typedKeysStatsToProgressData: (typedKeysStats: TypedKeyStats[]) => number[],
    private typedKeysHighlighter: TypedKeysHighlighter
  ) {
    super();
  }

  preInsertHtml(): void {
    this.containerId = this.generateId();
    this.typedKeysProgressId = this.generateId();
    this.byKeySwitchValue = false;
    this.byKeySwitch = new SwitchHtmlComponent(this.byKeySwitchValue);
    this.slider = new SliderHtmlComponent({
      min: 0,
      max: 10,
      value: this.smoothness,
      title: 'Smoothness',
    });
    this.graph = new TypingProgressGraphHtmlComponent(
      this.appStateClient,
      this.typedTextsStatsToProgressData(this.appStateClient.getAppState().typedTextsStats),
      this.smoothness
    );
    this.typedKeys = new TypedKeysHtmlComponent(TYPED_KEYS, 'a');
    this.byKeySwitch.preInsertHtml();
    this.slider.preInsertHtml();
    this.graph.preInsertHtml();
    this.typedKeys.preInsertHtml();
  }

  toHtml() {
    // prettier-ignore
    return /* html */ `
      <div id="${this.containerId}">
        <div class="progress-header">
          <span class="progress-name">${this.graphName}</span>
          <div class="progress-ctrl">
            <div class="progress-by-key"><span class="label">By key </span>${this.byKeySwitch.toHtml()}</div>
            <div class="progress-slider"><span class="label">Smoothness </span>${this.slider.toHtml()}</div>
          </div>
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
    this.byKeySwitch.postInsertHtml();
    this.slider.postInsertHtml();
    this.graph.postInsertHtml();
    this.typedKeys.postInsertHtml();

    this.slider.onUpdate(this.handleSliderChangeEvent.bind(this));
    this.typedKeys.onClick((key) => this.handleSelectKey(key));
    this.byKeySwitch.onUpdate(this.handleProgressByKeyUpdateEvent.bind(this));
    this.addCustomEventListener(END_TYPING_EVENT, this.handleEndTypingEvent.bind(this));
    this.addCustomEventListener(DELETE_PROGRESS_DATA_EVENT, this.handleDeleteProgressDataEvent.bind(this));
    this.typedKeysHighlighter.highligh(this.typedKeysProgressId, TYPED_KEY_CLASS);
  }

  private handleProgressByKeyUpdateEvent(active: boolean) {
    if (active) {
      this.typedKeysProgress.classList.remove('hide');
      this.handleSelectKey('a');
    } else {
      this.typedKeysProgress.classList.add('hide');
      this.useTypedTextsStats();
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

  private handleSliderChangeEvent(value: number) {
    this.smoothness = value;
    this.graph.reset({ smoothness: this.smoothness });
  }
}
