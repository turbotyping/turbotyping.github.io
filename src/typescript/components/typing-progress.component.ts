import { DELETE_PROGRESS_DATA_EVENT, END_TYPING_EVENT } from '../constants/constant';
import { AppStorage } from '../models/app-storage.model';
import { TypedKeyStats } from '../models/typed-key-stats.model';
import { TypedTextStats } from '../models/typed-text-stats.model';
import { BaseBlockHtmlComponent } from './base/base-block-component';
import { SliderHtmlComponent } from './core/slider.component';
import { SwitchHtmlComponent } from './core/switch.component';
import { TypedKeysHighlighter } from '../services/typed-keys-highlighter';
import { TypedKeysHtmlComponent, TYPED_KEY_CLASS } from './typed-keys.component';
import { TypingProgressGraphHtmlComponent } from './typing-progress-graph.component';

// const TYPED_KEYS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"{}()[]<>+-=,.;:';
const TYPED_KEYS = 'abcdefghijklmnopqrstuvwxyz';

export class TypingProgressHtmlComponent extends BaseBlockHtmlComponent {
  private graph: TypingProgressGraphHtmlComponent;
  private byKeySwitch: SwitchHtmlComponent;
  private byKeySwitchValue: boolean;
  private slider: SliderHtmlComponent;
  private smoothness: number = 0;
  private typedKeysProgressId: string;
  private typedKeysProgress: HTMLElement;
  private typedKeys: TypedKeysHtmlComponent;

  constructor(
    private graphName: string,
    private typedTextsStatsToProgressData: (typedTextsStats: TypedTextStats[]) => number[],
    private typedKeysStatsToProgressData: (typedKeysStats: TypedKeyStats[]) => number[],
    private typedKeysHighlighter: TypedKeysHighlighter
  ) {
    super();
  }

  __preInsertHtml(): void {
    this.typedKeysProgressId = this.getRandomId();
    this.byKeySwitchValue = false;
    this.byKeySwitch = new SwitchHtmlComponent(this.byKeySwitchValue);
    this.slider = new SliderHtmlComponent(0, 10, this.smoothness, 'Smoothness');
    this.graph = new TypingProgressGraphHtmlComponent(this.typedTextsStatsToProgressData(this.getAppStorage().typedTextsStats), this.smoothness);
    this.typedKeys = new TypedKeysHtmlComponent(TYPED_KEYS, 'a');
    this.byKeySwitch.preInsertHtml();
    this.slider.preInsertHtml();
    this.graph.preInsertHtml();
    this.typedKeys.preInsertHtml();
  }

  __toHtml() {
    // prettier-ignore
    return /* html */ `
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
    `;
  }

  __postInsertHtml(): void {
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
    const typedKeysStats = AppStorage.getTypedKeysStatsMap(this.getAppStorage()).get(keyLowercase) || [];
    this.graph.setGraphData(this.typedKeysStatsToProgressData(typedKeysStats));
    this.typedKeysHighlighter.highligh(this.typedKeysProgressId, TYPED_KEY_CLASS);
  }

  private handleEndTypingEvent() {
    this.useTypedTextsStats();
  }

  private handleDeleteProgressDataEvent() {
    this.useTypedTextsStats();
  }

  private useTypedTextsStats() {
    this.graph.setGraphData(this.typedTextsStatsToProgressData(this.getAppStorage().typedTextsStats));
  }

  private handleSliderChangeEvent(value: number) {
    this.smoothness = value;
    this.graph.setSmoothness(this.smoothness);
  }
}
