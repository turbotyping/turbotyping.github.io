import { CURRENT_THEME_LOCAL_STORAGE_KEY, DARK_THEME_VALUE, MIN_STATS_TO_DISPLAY, PROGRESS_DIV_ID } from '../constants/constant';
import { END_TYPING_EVENT } from '../constants/event.constant';
import { TypedTextStats } from '../models/typed-text-stats.model';
import { BaseHtmlComponent, BaseHtmlContainer, HtmlComponent } from './component';
const Chart = require('chart.js');

const GRID_LINES_COLOR_IN_DARK_THEME = '#333';
const GRID_LINES_COLOR_IN_LIGHT_THEME = '#eeeeee';

export abstract class AbstractProgressHtmlComponent extends BaseHtmlComponent {
  private notEnoughSamplesId: string;
  private progressCanvasId: string;
  private canvasDomElement: HTMLCanvasElement;
  private notEnoughSamplesDomElement: HTMLElement;
  private gridLinesColor: string;

  abstract getProgressName(): string;
  abstract getProgressBorderColor(): string;
  abstract toChartData(stats: TypedTextStats[]): number[];

  _preInsertHtml(): void {
    this.notEnoughSamplesId = this.getRandomId();
    this.progressCanvasId = this.getRandomId();
    console.log(this.notEnoughSamplesId);
  }

  _toHtml() {
    console.log(this.notEnoughSamplesId);
    // prettier-ignore
    return /* html */ `
      <div>
        <p id="${this.notEnoughSamplesId}" class="not-enough-samples">Not enough samples to display ${this.getProgressName()} progress</p> 
        <canvas id="${this.progressCanvasId}" width="40" height="40"></canvas>
      </div>
    `;
  }

  protected _postInsertHtml(): void {
    this.initDomElements();
    this.setGridLinesColor();
    this.update();
    this.addCustomEventListener(END_TYPING_EVENT, this.update.bind(this));
  }

  private initDomElements(): void {
    this.canvasDomElement = <HTMLCanvasElement>document.getElementById(this.progressCanvasId);
    this.notEnoughSamplesDomElement = document.getElementById(this.notEnoughSamplesId);
  }

  private setGridLinesColor() {
    const currentTheme = localStorage.getItem(CURRENT_THEME_LOCAL_STORAGE_KEY);
    if (currentTheme === DARK_THEME_VALUE) {
      this.gridLinesColor = GRID_LINES_COLOR_IN_DARK_THEME;
    } else {
      this.gridLinesColor = GRID_LINES_COLOR_IN_LIGHT_THEME;
    }
  }

  private update() {
    const stats = this.getAppStorage().typedTextStats;
    if (!stats || stats.length < MIN_STATS_TO_DISPLAY) {
      this.canvasDomElement.classList.add('hide');
    } else {
      this.notEnoughSamplesDomElement.classList.add('hide');
      this.canvasDomElement.classList.remove('hide');
      new Chart(this.canvasDomElement.getContext('2d'), {
        type: 'line',
        data: {
          labels: Array.from({ length: stats.length }, (_, i) => i + 1),
          datasets: [
            {
              data: this.toChartData(stats),
              label: `${this.getProgressName()}`,
              borderColor: `${this.getProgressBorderColor()}`,
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            yAxes: [
              {
                gridLines: {
                  color: `${this.gridLinesColor}`,
                },
                ticks: {
                  autoSkipPadding: 100,
                },
              },
            ],
            xAxes: [
              {
                gridLines: {
                  display: false,
                },
                ticks: {
                  autoSkipPadding: 100,
                },
              },
            ],
          },
        },
      });
    }
  }
}

export class ErrorsProgressHtmlComponent extends AbstractProgressHtmlComponent {
  getProgressName(): string {
    return 'Error';
  }
  getProgressBorderColor(): string {
    return '#e06c75';
  }

  toChartData(stats: TypedTextStats[]): number[] {
    return stats.map((stat) => stat.errors);
  }
}

export class SpeedProgressHtmlComponent extends AbstractProgressHtmlComponent {
  getProgressName(): string {
    return 'Speed';
  }
  getProgressBorderColor(): string {
    return '#078eed';
  }

  toChartData(stats: TypedTextStats[]): number[] {
    return stats.map((stat) => stat.wpm);
  }
}

export class ProgressContainerHtmlComponent extends BaseHtmlContainer {
  private components: HtmlComponent[];

  protected getComponents(): HtmlComponent[] {
    if (!this.components) {
      this.components = [];
      this.components.push(new SpeedProgressHtmlComponent());
      this.components.push(new ErrorsProgressHtmlComponent());
    }
    return this.components;
  }

  protected getContainerBeginTag(): string {
    return `<div id="${PROGRESS_DIV_ID}" class="progress-container">`;
  }

  protected getContainerEndTag(): string {
    return '</div>';
  }
}
