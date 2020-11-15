import { END_TYPING_EVENT } from '../constants/constant';
import { BaseHtmlComponent } from './component';
const Chart = require('chart.js');

const PROGRESS_CANVAS_ID = 'speed-progress-canvas-id';

export class SpeedProgressHtmlComponent extends BaseHtmlComponent {
  private canvas: HTMLCanvasElement;

  _toHtml() {
    return /* html */ `
      <div>
        <canvas id="${PROGRESS_CANVAS_ID}" width="40" height="40"></canvas>
      </div>
    `;
  }

  protected _postInsertHtml(): void {
    this.canvas = <HTMLCanvasElement>document.getElementById(PROGRESS_CANVAS_ID);
    this.update();
    this.addCustomEventListener(END_TYPING_EVENT, this.update.bind(this));
  }

  private update() {
    const stats = this.getAppStorage().typedTextStats;
    if (!stats || stats.length < 10) {
      this.canvas.classList.add('hide');
    } else {
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
