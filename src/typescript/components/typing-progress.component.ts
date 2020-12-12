import { DELETE_PROGRESS_DATA_EVENT, END_TYPING_EVENT } from '../constants/event.constant';
import { TypedTextStats } from '../models/typed-text-stats.model';
import { BaseBlockHtmlComponent } from './base/base-block-component';
import { SliderHtmlComponent } from './core/slider.component';
import { SwitchHtmlComponent } from './core/switch.component';
import { TypingProgressGraphHtmlComponent } from './typing-progress-graph.component';

export class TypingProgressHtmlComponent extends BaseBlockHtmlComponent {
  private graph: TypingProgressGraphHtmlComponent;
  private byKeySwitch: SwitchHtmlComponent;
  private byKeySwitchValue: boolean;
  private slider: SliderHtmlComponent;
  private smoothness: number = 0;

  constructor(private graphName: string, private typedTextsStatsToProgressData: (typedTextStats: TypedTextStats[]) => number[]) {
    super();
  }

  __preInsertHtml(): void {
    this.byKeySwitchValue = false;
    this.byKeySwitch = new SwitchHtmlComponent(this.byKeySwitchValue);
    this.slider = new SliderHtmlComponent(0, 10, this.smoothness, 'Smoothness');
    this.graph = new TypingProgressGraphHtmlComponent(this.typedTextsStatsToProgressData(this.getAppStorage().typedTextsStats), this.smoothness);
    this.byKeySwitch.preInsertHtml();
    this.slider.preInsertHtml();
    this.graph.preInsertHtml();
    this.addCustomEventListener(END_TYPING_EVENT, this.updateProgressData.bind(this));
    this.addCustomEventListener(DELETE_PROGRESS_DATA_EVENT, this.updateProgressData.bind(this));
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
      <div class="progress-body">
        ${this.graph.toHtml()}
      </div>
    `;
  }

  __postInsertHtml(): void {
    this.byKeySwitch.postInsertHtml();
    this.slider.postInsertHtml();
    this.graph.postInsertHtml();
    this.slider.onUpdate(this.handleSliderChangeEvent.bind(this));
  }

  private updateProgressData() {
    this.graph.setGraphData(this.typedTextsStatsToProgressData(this.getAppStorage().typedTextsStats));
  }

  private handleSliderChangeEvent(value: number) {
    this.smoothness = value;
    this.graph.setSmoothness(this.smoothness);
  }
}
