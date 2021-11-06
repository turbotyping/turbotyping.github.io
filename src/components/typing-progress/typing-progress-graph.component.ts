import { CHANGE_THEME_EVENT, DARK_THEME_VALUE, MIN_STATS_TO_DISPLAY_PROGRESS_GRAPH } from '../../constants/constant';
import { BaseHtmlComponent } from '../_core/base-component';
import { IAppStateClient } from '../../state/app-state.client.interface';
import { Color } from '../_core/color';
const Chart = require('chart.js');

const GRID_LINES_COLOR_IN_DARK_THEME = '#333';
const GRID_LINES_COLOR_IN_LIGHT_THEME = '#eeeeee';

export class TypingProgressGraphHtmlComponentInput {
  graphData?: number[];
  smoothness?: number;
  barColor?: Color;
  withAverageLine?: boolean;
}

export class TypingProgressGraphHtmlComponent extends BaseHtmlComponent {
  private canvasContainerId: string;
  private canvasContainer: HTMLElement;
  private gridLinesColor: string;
  private containerId: string;
  private input: TypingProgressGraphHtmlComponentInput;

  constructor(private appStateClient: IAppStateClient, graphData: number[], smoothness: number, barColor: Color, withAverageLine: boolean) {
    super();
    this.input = {
      graphData,
      smoothness,
      barColor,
      withAverageLine,
    };
  }

  preInsertHtml(): void {
    this.containerId = this.generateId();
    this.canvasContainerId = this.generateId();
  }

  toHtml() {
    // prettier-ignore
    return /* html */ `
      <div id="${this.containerId}">
        <div id="${this.canvasContainerId}" class="chartjs-graph-container"></div>
      </div>
    `;
  }

  postInsertHtml(): void {
    this.canvasContainer = document.getElementById(this.canvasContainerId);
    this.setGridLinesColor();
    this.updateInnerHTML();
    this.addCustomEventListener(CHANGE_THEME_EVENT, this.handleChangeThemeEvent.bind(this));
  }

  reset(input: TypingProgressGraphHtmlComponentInput): void {
    this.input = { ...this.input, ...input };
    this.updateInnerHTML();
  }

  private handleChangeThemeEvent(): void {
    this.setGridLinesColor();
    this.updateInnerHTML();
  }

  private setGridLinesColor() {
    if (this.appStateClient.getAppState().currentTheme === DARK_THEME_VALUE) {
      this.gridLinesColor = GRID_LINES_COLOR_IN_DARK_THEME;
    } else {
      this.gridLinesColor = GRID_LINES_COLOR_IN_LIGHT_THEME;
    }
  }

  private updateInnerHTML() {
    this.updateContainerCssClass();
    const canvas = document.createElement('canvas');
    this.canvasContainer.innerHTML = '';
    this.canvasContainer.appendChild(canvas);
    new Chart(canvas.getContext('2d'), {
      data: {
        labels: Array.from({ length: this.getGraphData().length }, (_, i) => i + 1),
        datasets: this.getGraphDataset(),
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        elements: {
          point: {
            radius: 0,
          },
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

  private updateContainerCssClass() {
    const graphData = this.getGraphData();
    if (graphData.length == 0) {
      this.canvasContainer.classList.add('empty');
    } else {
      this.canvasContainer.classList.remove('empty');
    }
  }

  private getGraphDataset() {
    if (this.input.withAverageLine) {
      return [
        {
          label: 'Moyenne',
          type: 'line',
          data: this.toMovingAverageArray(this.getGraphData()),
          borderWidth: 5,
          borderColor: this.getAvgSpeedBorderColor(),
          backgroundColor: this.getAvgSpeedBackgroundColor(),
        },
        {
          label: 'Words per minute',
          type: 'bar',
          data: this.getGraphData(),
          backgroundColor: this.input.barColor.get(),
        },
      ];
    } else {
      return [
        {
          label: 'Errors per minute',
          type: 'bar',
          data: this.getGraphData(),
          backgroundColor: this.input.barColor.get(),
        },
      ];
    }
  }

  private getAvgSpeedBorderColor() {
    return '#1967D2';
  }

  private getAvgSpeedBackgroundColor() {
    return '#FFFFFF00';
  }

  private toMovingAverageArray(array) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
      const subArr = array.slice(Math.max(i - 5, 0), Math.min(i + 1, array.length));
      const avg = subArr.reduce((a, b) => a + (isNaN(b) ? 0 : b), 0) / subArr.length;
      result.push(avg);
    }
    return result;
  }

  private getGraphData(): number[] {
    return this.input.graphData.length < MIN_STATS_TO_DISPLAY_PROGRESS_GRAPH ? [] : this.input.graphData;
  }
}
