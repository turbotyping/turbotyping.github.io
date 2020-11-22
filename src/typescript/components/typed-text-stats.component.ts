import { PROGRESS_DIV_ID } from '../constants/constant';
import { END_TYPING_EVENT } from '../constants/event.constant';
import { TypedTextStats } from '../models/typed-text-stats.model';
import { BaseBlockHtmlComponent } from './core/base-block-component';

const TYPED_TEXT_SECONDS_DOM_ELEMENT_ID = 'TypedTextSeconds';
const TYPED_TEXT_WPM_DOM_ELEMENT_ID = 'TypedTextWpm';
const TYPED_TEXT_ERRORS_DOM_ELEMENT_ID = 'TypedTextErrors';

export class TypedTextHtmlComponent extends BaseBlockHtmlComponent {
  private typedTextSecondsDomElement: HTMLElement;
  private typedTextWpmDomElement: HTMLElement;
  private typedTextErrorsDomElement: HTMLElement;

  __preInsertHtml(): void {
    // do nothing by default
  }

  __toHtml() {
    return /* html */ `
      <div class="typed-text-stats-container">
        <div class="typed-text-stat-container">
          <span id="${TYPED_TEXT_SECONDS_DOM_ELEMENT_ID}" class="typed-text-stat-value">0</span>
          <span class="typed-text-stat-label">seconds</span>
        </div>
        <div class="typed-text-stat-container">
          <span id="${TYPED_TEXT_WPM_DOM_ELEMENT_ID}" class="typed-text-stat-value">0</span>
          <span class="typed-text-stat-label">word/min</span>
        </div>
        <div class="typed-text-stat-container">
          <span id="${TYPED_TEXT_ERRORS_DOM_ELEMENT_ID}" class="typed-text-stat-value">0</span>
          <span class="typed-text-stat-label">errors</span>
        </div>
        <div class="typed-text-stat-container check-progress-link">
          <a href="#${PROGRESS_DIV_ID}">
            <span class="iconify" data-icon="gridicons:stats-alt-2" data-inline="false"></span>
          </a>
        </div>
      </div>
    `;
  }

  __postInsertHtml(): void {
    this.typedTextSecondsDomElement = document.getElementById(TYPED_TEXT_SECONDS_DOM_ELEMENT_ID);
    this.typedTextWpmDomElement = document.getElementById(TYPED_TEXT_WPM_DOM_ELEMENT_ID);
    this.typedTextErrorsDomElement = document.getElementById(TYPED_TEXT_ERRORS_DOM_ELEMENT_ID);
    this.addCustomEventListener(END_TYPING_EVENT, this.handleEndTypingEvent.bind(this));
    const appStorage = this.getAppStorage();
    if (appStorage.typedTextStats.length > 0) {
      this.updateStats(appStorage.typedTextStats[appStorage.typedTextStats.length - 1]);
    }
  }

  private handleEndTypingEvent(event) {
    this.updateStats(event.detail);
  }

  private updateStats(stat: TypedTextStats) {
    if (stat) {
      this.animateValue(this.typedTextSecondsDomElement, stat.seconds);
      this.animateValue(this.typedTextWpmDomElement, stat.wpm);
      this.animateValue(this.typedTextErrorsDomElement, stat.errors);
    }
  }

  private animateValue(domElement: HTMLElement, value: number, duration: number = 700) {
    if (value == 0) return;
    let current = 0;
    const stepTime = Math.abs(Math.floor(duration / value));
    const timer = setInterval(function () {
      current += 1;
      domElement.innerHTML = '' + current;
      if (current == value) {
        clearInterval(timer);
      }
    }, stepTime);
  }
}
