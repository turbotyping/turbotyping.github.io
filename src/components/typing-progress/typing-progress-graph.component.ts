import { CHANGE_THEME_EVENT, DARK_THEME_VALUE, MIN_STATS_TO_DISPLAY_PROGRESS_GRAPH } from '../common/ts/base/constant';
import { BaseStatefulHtmlComponent } from '../common/ts/base/base-stateful-component';
const Chart = require('chart.js');
const smooth = require('array-smooth');

const GRID_LINES_COLOR_IN_DARK_THEME = '#333';
const GRID_LINES_COLOR_IN_LIGHT_THEME = '#eeeeee';

export class TypingProgressGraphHtmlComponentInput {
  graphData?: number[];
  smoothness?: number;
}

export class TypingProgressGraphHtmlComponent extends BaseStatefulHtmlComponent<TypingProgressGraphHtmlComponentInput, void> {
  private notEnoughSamplesId: string;
  private canvasContainerId: string;
  private canvasContainer: HTMLElement;
  private canvasId: string;
  private canvas: HTMLCanvasElement;
  private notEnoughSamplesDomElement: HTMLElement;
  private gridLinesColor: string;
  private containerId: string;
  private input: TypingProgressGraphHtmlComponentInput;

  constructor(graphData: number[], smoothness: number) {
    super();
    this.input = {
      graphData,
      smoothness,
    };
  }

  preInsertHtml(): void {
    this.containerId = this.generateId();
    this.notEnoughSamplesId = this.generateId();
    this.canvasContainerId = this.generateId();
    this.canvasId = this.generateId();
  }

  toHtml() {
    // prettier-ignore
    return /* html */ `
      <div id="${this.containerId}">
        <p id="${this.notEnoughSamplesId}" class="not-enough-samples">Not enough samples to display progress</p> 
        <div id="${this.canvasContainerId}" class="chartjs-graph-container"><canvas id="${this.canvasId}" width="40" height="40"></canvas></div>
      </div>
    `;
  }

  postInsertHtml(): void {
    this.canvasContainer = document.getElementById(this.canvasContainerId);
    this.canvas = <HTMLCanvasElement>document.getElementById(this.canvasId);
    this.notEnoughSamplesDomElement = document.getElementById(this.notEnoughSamplesId);
    this.setGridLinesColor();
    this.updateInnerHTML();
    this.addCustomEventListener(CHANGE_THEME_EVENT, this.handleChangeThemeEvent.bind(this));
  }

  getContainerQuerySelector(): string {
    return this.containerId;
  }

  update(input: TypingProgressGraphHtmlComponentInput): void {
    this.input = { ...this.input, ...input };
    this.updateInnerHTML();
  }

  private handleChangeThemeEvent(): void {
    this.setGridLinesColor();
    this.updateInnerHTML();
  }

  private setGridLinesColor() {
    if (this.getAppState().currentTheme === DARK_THEME_VALUE) {
      this.gridLinesColor = GRID_LINES_COLOR_IN_DARK_THEME;
    } else {
      this.gridLinesColor = GRID_LINES_COLOR_IN_LIGHT_THEME;
    }
  }

  private updateInnerHTML() {
    if (!this.input.graphData || this.input.graphData.length < MIN_STATS_TO_DISPLAY_PROGRESS_GRAPH) {
      this.canvasContainer.classList.add('hide');
      this.notEnoughSamplesDomElement.classList.remove('hide');
    } else {
      this.notEnoughSamplesDomElement.classList.add('hide');
      this.canvasContainer.classList.remove('hide');
      new Chart(this.canvas.getContext('2d'), {
        type: 'line',
        data: {
          labels: Array.from({ length: this.input.graphData.length }, (_, i) => i + 1),
          datasets: [
            {
              data: this.input.smoothness == 0 ? this.input.graphData : smooth(this.input.graphData, this.input.smoothness),
              borderColor: '#087eed',
              fill: false,
              showLine: false,
              backgroundColor: '#087eed',
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
          scales: {
            yAxes: [
              {
                gridLines: {
                  color: `${this.gridLinesColor}`,
                },
                ticks: {
                  autoSkipPadding: 50,
                  beginAtZero: true,
                },
              },
            ],
            xAxes: [
              {
                gridLines: {
                  display: false,
                },
                ticks: {
                  autoSkipPadding: 300,
                },
              },
            ],
          },
        },
      });
    }
  }
}
