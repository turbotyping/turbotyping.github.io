import './typed-text-stats.scss';
import { BaseHtmlComponent } from '../_core/base-component';
import { IAppStateClient } from '../../state/app-state.client.interface';
import { MIN_STATS_TO_DISPLAY_PROGRESS_GRAPH } from '../../constants/constant';

export class TypedKeysStatsHtmlComponent extends BaseHtmlComponent {
  private typedKeysStatsId: string;
  private typedKeysStats: HTMLElement;

  constructor(private appStateClient: IAppStateClient) {
    super();
  }

  preInsertHtml(): void {
    this.typedKeysStatsId = this.generateId();
  }

  toHtml() {
    return /* html */ `
      <div id="${this.typedKeysStatsId}" class="typed-keys-stats-container"></div>
    `;
  }

  postInsertHtml(): void {
    this.typedKeysStats = document.getElementById(this.typedKeysStatsId);
    let html = '';
    'abcdefghijklmnopqrstuvwxyz'.split('').forEach((c) => {
      const keyStats = this.appStateClient.getTypedKeysStatsMap();
      let cssClass = 'no-data-available-yet';
      let title = 'No data available yet';
      if (keyStats && keyStats.get(c)) {
        let stats = keyStats.get(c);
        let statsWpm = stats.filter((s) => s.wpm > 0).map((s) => s.wpm);
        if (statsWpm.length >= MIN_STATS_TO_DISPLAY_PROGRESS_GRAPH) {
          let minWpm = Math.min(...statsWpm);
          let maxWpm = Math.max(...statsWpm);
          let avgWpm = Math.round(statsWpm.reduce((sum, current) => sum + current, 0) / statsWpm.length);
          if (minWpm !== maxWpm) {
            title = `Average typing speed: ${avgWpm}wpm&#10;Best typing speed: ${maxWpm}wpm`;
          } else {
            title = `Typing speed: ${avgWpm}`;
          }
          if (avgWpm < 10) {
            cssClass = 'avg-wpm-lt-10';
          } else if (avgWpm < 20) {
            cssClass = 'avg-wpm-lt-20';
          } else if (avgWpm < 30) {
            cssClass = 'avg-wpm-lt-30';
          } else if (avgWpm < 40) {
            cssClass = 'avg-wpm-lt-40';
          } else if (avgWpm < 50) {
            cssClass = 'avg-wpm-lt-50';
          } else {
            cssClass = 'avg-wpm-gte-50';
          }
        }
      }
      html += `<span title="${title}" class="typed-key ${cssClass}">${c.toUpperCase()}</span>`;
    });
    this.typedKeysStats.innerHTML = html;
  }
}
