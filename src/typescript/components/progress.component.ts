import { BaseBlockHtmlComponent } from './base/base-block-component';
import { SliderHtmlComponent } from './core/slider.component';
import { ProgressGraphHtmlComponent } from './progress-graph.component';

export class ProgressHtmlComponent extends BaseBlockHtmlComponent {
  private graph: ProgressGraphHtmlComponent;
  private slider: SliderHtmlComponent;
  private smoothness: number = 0;

  constructor(private graphName: string, private graphData: number[]) {
    super();
  }

  __preInsertHtml(): void {
    this.slider = new SliderHtmlComponent(0, 10, this.smoothness, 'Smoothness');
    this.graph = new ProgressGraphHtmlComponent(this.graphData, this.smoothness);
    this.slider.preInsertHtml();
    this.graph.preInsertHtml();
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

  public setGraphData(graphData: number[]) {
    this.graphData = graphData;
    this.graph.setGraphData(graphData);
  }

  private handleSliderChangeEvent(value: number) {
    this.smoothness = value;
    this.graph.setSmoothness(this.smoothness);
  }
}
