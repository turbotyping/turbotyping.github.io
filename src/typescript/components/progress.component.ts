import { DARK_THEME_VALUE, MIN_STATS_TO_DISPLAY } from '../constants/constant';
import { CHANGE_THEME_EVENT, DELETE_PROGRESS_DATA_EVENT, END_TYPING_EVENT } from '../constants/event.constant';
import { TypedTextStats } from '../models/typed-text-stats.model';
import { BaseBlockHtmlComponent } from './base/base-block-component';
import { SliderHtmlComponent } from './core/slider.component';
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
  private slider: SliderHtmlComponent;
  private smoothness: number = 0;

  abstract getProgressName(): string;
  abstract getProgressBorderColor(): string;
  abstract toChartData(stats: TypedTextStats[]): number[];

  __preInsertHtml(): void {
    this.slider = new SliderHtmlComponent(0, 10, this.smoothness);
    this.notEnoughSamplesId = this.getRandomId();
    this.progressCanvasId = this.getRandomId();
    this.slider.preInsertHtml();
  }

  __toHtml() {
    // prettier-ignore
    return /* html */ `
      <div>
        <p id="${this.notEnoughSamplesId}" class="not-enough-samples">Not enough samples to display ${this.getProgressName()} progress</p> 
        <canvas id="${this.progressCanvasId}" width="40" height="40"></canvas>
        <div class="progress-smoothness">
          <span>Smoothness</span>
          <div class="progress-smoothness-slider">${this.slider.toHtml()}</div>
        </div>
      </div>
    `;
  }

  __postInsertHtml(): void {
    this.slider.postInsertHtml();
    this.initDomElements();
    this.setGridLinesColor();
    this.update();
    this.addCustomEventListener(END_TYPING_EVENT, this.update.bind(this));
    this.addCustomEventListener(DELETE_PROGRESS_DATA_EVENT, this.update.bind(this));
    this.addCustomEventListener(CHANGE_THEME_EVENT, this.handleChangeThemeEvent.bind(this));
    this.slider.onUpdate(this.handleSliderChangeEvent.bind(this));
  }

  private handleSliderChangeEvent(value: number) {
    this.smoothness = value;
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
    const stats = this.getAppStorage().typedTextStats;
    if (!stats || stats.length < MIN_STATS_TO_DISPLAY) {
      this.canvasDomElement.classList.add('hide');
      this.notEnoughSamplesDomElement.classList.remove('hide');
    } else {
      this.notEnoughSamplesDomElement.classList.add('hide');
      this.canvasDomElement.classList.remove('hide');
      new Chart(this.canvasDomElement.getContext('2d'), {
        type: 'line',
        data: {
          labels: Array.from({ length: stats.length }, (_, i) => i + 1),
          datasets: [
            {
              data: this.smoothness == 0 ? this.toChartData(stats) : smooth(this.toChartData(stats), this.smoothness),
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
