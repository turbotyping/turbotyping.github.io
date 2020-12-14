import { APP_STATE_LOCAL_STORAGE_KEY, MIN_STATS_TO_DISPLAY_PROGRESS_GRAPH } from '../common/ts/base/constant';
import { AppState } from '../common/ts/base/app-state.model';
import { TypedKeysHighlighter } from './typed-keys-highlighter';

export class SpeedProgressTypedKeysHighlighter implements TypedKeysHighlighter {
  highligh(typedKeysContainerId: string, typedKeyCssClass: string) {
    const container = document.getElementById(typedKeysContainerId);
    const appStorage = JSON.parse(localStorage.getItem(APP_STATE_LOCAL_STORAGE_KEY)) || new AppState();
    const keyStats = AppState.getTypedKeysStatsMap(appStorage);
    container.querySelectorAll(`.${typedKeyCssClass}`).forEach((span) => {
      let typedKey = span.innerHTML.toLowerCase();
      let cssClass = 'not-enough-data-available-yet';
      let title = 'No data available yet';
      if (keyStats && keyStats.get(typedKey)) {
        let stats = keyStats
          .get(typedKey)
          .filter((s) => s.wpm > 0)
          .map((s) => s.wpm);
        if (stats.length >= MIN_STATS_TO_DISPLAY_PROGRESS_GRAPH) {
          let avg = Math.round(stats.reduce((sum, current) => sum + current, 0) / stats.length);
          let max = Math.max(...stats);
          if (avg !== max) {
            title = `Average typing speed: ${avg}wpm. Best typing speed: ${max}wpm`;
          } else {
            title = `Typing speed: ${avg}`;
          }
          if (avg < 10) {
            cssClass = 'avg-wpm-lt-10';
          } else if (avg < 20) {
            cssClass = 'avg-wpm-lt-20';
          } else if (avg < 30) {
            cssClass = 'avg-wpm-lt-30';
          } else if (avg < 40) {
            cssClass = 'avg-wpm-lt-40';
          } else if (avg < 50) {
            cssClass = 'avg-wpm-lt-50';
          } else {
            cssClass = 'avg-wpm-gte-50';
          }
        }
      }
      span.classList.add(cssClass);
      span.setAttribute('title', title);
    });
  }
}
