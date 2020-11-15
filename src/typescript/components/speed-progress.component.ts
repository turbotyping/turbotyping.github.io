import { END_TYPING_EVENT, MIN_STATS_TO_DISPLAY } from '../constants/constant';
import { BaseHtmlComponent } from './component';
const Chart = require('chart.js');

const PROGRESS_CANVAS_ID = 'speed-progress-canvas-id';
const NOT_ENOUGH_SAMPLES_ID = 'not-enough-speed-samples-id';

export class SpeedProgressHtmlComponent extends BaseHtmlComponent {
  private canvas: HTMLCanvasElement;
  private notEnoughSampleMessage: HTMLElement;

  _toHtml() {
    return /* html */ `
      <div>
        <p id="${NOT_ENOUGH_SAMPLES_ID}" class="not-enough-samples">Not enough samples to display speed progress</p> 
        <canvas id="${PROGRESS_CANVAS_ID}" width="40" height="40"></canvas>
      </div>
    `;
  }

  protected _postInsertHtml(): void {
    this.canvas = <HTMLCanvasElement>document.getElementById(PROGRESS_CANVAS_ID);
    this.notEnoughSampleMessage = document.getElementById(NOT_ENOUGH_SAMPLES_ID);
    this.update();
    this.addCustomEventListener(END_TYPING_EVENT, this.update.bind(this));
  }

  private update() {
    const stats = this.getAppStorage().typedTextStats;
    if (!stats || stats.length < MIN_STATS_TO_DISPLAY) {
      this.canvas.classList.add('hide');
    } else {
      this.notEnoughSampleMessage.classList.add('hide');
      this.canvas.classList.remove('hide');
      new Chart(this.canvas.getContext('2d'), {
        type: 'line',
        data: {
          labels: Array.from({ length: stats.length }, (_, i) => i + 1),
          datasets: [
            {
              data: stats.map((stat) => stat.wpm),
              label: 'Speed',
              borderColor: '#078eed',
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            xAxes: [
              {
                ticks: {
                  display: false, //this will remove only the label
                },
              },
            ],
          },
        },
      });
    }
  }
}
