import { MIN_STATS_TO_DISPLAY_PROGRESS_GRAPH } from '../../constants/constant';
import { IAppStateClient } from '../../state/app-state.client.interface';
import { TypedKeysHighlighter } from './typed-keys-highlighter';

export class ErrorProgressTypedKeysHighlighter implements TypedKeysHighlighter {
  constructor(private appStateClient: IAppStateClient) {}

  public highligh(typedKeysContainerId: string, typedKeyCssClass: string) {
    const container = document.getElementById(typedKeysContainerId);
    const keyStats = this.appStateClient.getTypedKeysStatsMap();
    container.querySelectorAll(`.${typedKeyCssClass}`).forEach((span) => {
      let typedKey = span.innerHTML.toLowerCase();
      let cssClass = 'not-enough-data-available-yet';
      let title = 'No data available yet';
      if (keyStats && keyStats.get(typedKey)) {
        let stats = keyStats.get(typedKey).map((s) => s.missCount);
        if (stats.length >= MIN_STATS_TO_DISPLAY_PROGRESS_GRAPH) {
          let avg = Math.round(stats.reduce((sum, current) => sum + current, 0) / stats.length);
          let max = Math.max(...stats);
          if (avg !== max) {
            title = `Average typing error: ${avg}. Worst typing error: ${max}`;
          } else {
            title = `Typing error: ${avg}`;
          }
          if (avg === 0) {
            cssClass = 'avg-error-eq-0';
          } else if (avg < 3) {
            cssClass = 'avg-error-lt-3';
          } else if (avg < 6) {
            cssClass = 'avg-error-lt-6';
          } else if (avg < 10) {
            cssClass = 'avg-error-lt-10';
          } else {
            cssClass = 'avg-error-gte-10';
          }
        }
      }
      span.classList.add(cssClass);
      span.setAttribute('title', title);
    });
  }
}
