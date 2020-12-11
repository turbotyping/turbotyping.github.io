import { DARK_THEME_VALUE, MIN_STATS_TO_DISPLAY } from '../constants/constant';
import { CHANGE_THEME_EVENT } from '../constants/event.constant';
import { BaseBlockHtmlComponent } from './base/base-block-component';
const Chart = require('chart.js');
const smooth = require('array-smooth');

const GRID_LINES_COLOR_IN_DARK_THEME = '#333';
const GRID_LINES_COLOR_IN_LIGHT_THEME = '#eeeeee';

export class LineGraphHtmlComponent extends BaseBlockHtmlComponent {
  private notEnoughSamplesId: string;
  private progressCanvasId: string;
  private canvasDomElement: HTMLCanvasElement;
  private notEnoughSamplesDomElement: HTMLElement;
  private gridLinesColor: string;

  constructor(private graphData: number[], private smoothness: number) {
    super();
  }

  __preInsertHtml(): void {
    this.notEnoughSamplesId = this.getRandomId();
    this.progressCanvasId = this.getRandomId();
  }

  __toHtml() {
    // prettier-ignore
    return /* html */ `
      <p id="${this.notEnoughSamplesId}" class="not-enough-samples">Not enough samples to display graph progress</p> 
      <div class="chartjs-graph-container"><canvas id="${this.progressCanvasId}" width="40" height="40"></canvas></div>
    `;
  }

  __postInsertHtml(): void {
    this.initDomElements();
    this.setGridLinesColor();
    this.update();
    this.addCustomEventListener(CHANGE_THEME_EVENT, this.handleChangeThemeEvent.bind(this));
  }

  public setSmoothness(smoothness: number): void {
    this.smoothness = smoothness;
    this.update();
  }

  public setGraphData(graphData: number[]) {
    this.graphData = graphData;
    this.update();
  }

  private handleChangeThemeEvent(): void {
    this.setGridLinesColor();
    this.update();
  }

  private initDomElements(): void {
    this.canvasDomElement = <HTMLCanvasElement>document.getElementById(this.progressCanvasId);
    this.notEnoughSamplesDomElement = document.getElementById(this.notEnoughSamplesId);
  }

  private setGridLinesColor() {
    if (this.getAppStorage().currentTheme === DARK_THEME_VALUE) {
      this.gridLinesColor = GRID_LINES_COLOR_IN_DARK_THEME;
    } else {
      this.gridLinesColor = GRID_LINES_COLOR_IN_LIGHT_THEME;
    }
  }

  private update() {
    if (!this.graphData || this.graphData.length < MIN_STATS_TO_DISPLAY) {
      this.canvasDomElement.classList.add('hide');
      this.notEnoughSamplesDomElement.classList.remove('hide');
    } else {
      this.notEnoughSamplesDomElement.classList.add('hide');
      this.canvasDomElement.classList.remove('hide');
      new Chart(this.canvasDomElement.getContext('2d'), {
        type: 'line',
        data: {
          labels: Array.from({ length: this.graphData.length }, (_, i) => i + 1),
          datasets: [
            {
              data: this.smoothness == 0 ? this.graphData : smooth(this.graphData, this.smoothness),
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
                  max: Math.max(...this.graphData) + 5,
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
