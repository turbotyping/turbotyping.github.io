import { DELETE_PROGRESS_DATA_EVENT, END_TYPING_EVENT } from '../constants/event.constant';
import { TypedTextStats } from '../models/typed-text-stats.model';
import { BaseBlockHtmlComponent } from './base/base-block-component';
import { SliderHtmlComponent } from './core/slider.component';
import { ProgressGraphHtmlComponent } from './progress-graph.component';

export class ProgressHtmlComponent extends BaseBlockHtmlComponent {
  private graph: ProgressGraphHtmlComponent;
  private slider: SliderHtmlComponent;
  private smoothness: number = 0;

  constructor(private graphName: string, private typedTextsStatsToProgressData: (typedTextStats: TypedTextStats[]) => number[]) {
    super();
  }

  __preInsertHtml(): void {
    this.slider = new SliderHtmlComponent(0, 10, this.smoothness, 'Smoothness');
    this.graph = new ProgressGraphHtmlComponent(this.typedTextsStatsToProgressData(this.getAppStorage().typedTextsStats), this.smoothness);
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
        <div class="progress-slider">${this.slider.toHtml()}</div>
      </div>
      <div class="progress-body">
        ${this.graph.toHtml()}
      </div>
    `;
  }

  __postInsertHtml(): void {
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
