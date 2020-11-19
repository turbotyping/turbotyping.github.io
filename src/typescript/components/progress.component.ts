import { DARK_THEME_VALUE, MIN_STATS_TO_DISPLAY, PROGRESS_DIV_ID } from '../constants/constant';
import { CHANGE_THEME_EVENT, END_TYPING_EVENT } from '../constants/event.constant';
import { TypedTextStats } from '../models/typed-text-stats.model';
import { BaseBlockHtmlContainer, HtmlComponent, BaseBlockHtmlComponent } from './component';
const Chart = require('chart.js');
const smooth = require('array-smooth');

const GRID_LINES_COLOR_IN_DARK_THEME = '#333';
const GRID_LINES_COLOR_IN_LIGHT_THEME = '#eeeeee';

export abstract class AbstractProgressHtmlComponent extends BaseBlockHtmlComponent {
  private notEnoughSamplesId: string;
  private progressCanvasId: string;
  private canvasDomElement: HTMLCanvasElement;
  private notEnoughSamplesDomElement: HTMLElement;
  private gridLinesColor: string;

  abstract getProgressName(): string;
  abstract getProgressBorderColor(): string;
  abstract toChartData(stats: TypedTextStats[]): number[];

  __preInsertHtml(): void {
    this.notEnoughSamplesId = this.getRandomId();
    this.progressCanvasId = this.getRandomId();
  }

  __toHtml() {
    // prettier-ignore
    return /* html */ `
      <div>
        <p id="${this.notEnoughSamplesId}" class="not-enough-samples">Not enough samples to display ${this.getProgressName()} progress</p> 
        <canvas id="${this.progressCanvasId}" width="40" height="40"></canvas>
      </div>
    `;
  }

  __postInsertHtml(): void {
    this.initDomElements();
    this.setGridLinesColor();
    this.update();
    this.addCustomEventListener(END_TYPING_EVENT, this.update.bind(this));
    this.addCustomEventListener(CHANGE_THEME_EVENT, this.handleChangeThemeEvent.bind(this));
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

  private avg(array) {
    return array.reduce((a, b) => a + b, 0) / array.length;
  }

  private smooth(vector, variance = 1) {
    const t_avg = this.avg(vector) * variance;
    const ret = Array(vector.length);
    for (var i = 0; i < vector.length; i++) {
      let prev = i > 0 ? ret[i - 1] : vector[i];
      let next = i < vector.length ? vector[i] : vector[i - 1];
      ret[i] = this.avg([t_avg, this.avg([prev, vector[i], next])]);
    }
    return ret;
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
              data: smooth(this.toChartData(stats), 3),
              label: `${this.getProgressName()}`,
              borderColor: `${this.getProgressBorderColor()}`,
              fill: false,
              showLine: false,
              backgroundColor: `${this.getProgressBorderColor()}`,
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

export class ProgressContainerHtmlComponent extends BaseBlockHtmlContainer {
  protected __getComponents(): HtmlComponent[] {
    const res = [];
    res.push(new SpeedProgressHtmlComponent());
    res.push(new ErrorsProgressHtmlComponent());
    return res;
  }

  protected getContainerBeginTag(): string {
    return `<div id="${PROGRESS_DIV_ID}" class="progress-container">`;
  }

  protected getContainerEndTag(): string {
    return '</div>';
  }
}
