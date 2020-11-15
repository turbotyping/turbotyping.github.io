import { END_TYPING_EVENT } from "../constants/constant";
import { TextToTypeStats } from "../models/text-to-type-stats.model";
import { BaseHtmlComponent } from "./component";

const TYPED_TEXT_SECONDS_DOM_ELEMENT_ID = "TypedTextSeconds";
const TYPED_TEXT_WPM_DOM_ELEMENT_ID = "TypedTextWpm";
const TYPED_TEXT_ERRORS_DOM_ELEMENT_ID = "TypedTextErrors";

export class TypedTextHtmlComponent extends BaseHtmlComponent {

  private typedTextSecondsDomElement: HTMLElement;
  private typedTextWpmDomElement: HTMLElement;
  private typedTextErrorsDomElement: HTMLElement;

  _toHtml() {
    return /* html */`
      <div class="typed-text-stats-container">
        <div class="typed-text-stat-container">
          <span id="${TYPED_TEXT_SECONDS_DOM_ELEMENT_ID}" class="typed-text-stat-value">NA</span>
          <span class="typed-text-stat-label">seconds</span>
        </div>
        <div class="typed-text-stat-container">
          <span id="${TYPED_TEXT_WPM_DOM_ELEMENT_ID}" class="typed-text-stat-value">NA</span>
          <span class="typed-text-stat-label">word/min</span>
        </div>
        <div class="typed-text-stat-container">
          <span id="${TYPED_TEXT_ERRORS_DOM_ELEMENT_ID}" class="typed-text-stat-value">NA</span>
          <span class="typed-text-stat-label">errors</span>
        </div>
      </div>
    `;
  }

  protected _postInsertHtml(): void {
    this.typedTextSecondsDomElement = document.getElementById(TYPED_TEXT_SECONDS_DOM_ELEMENT_ID);
    this.typedTextWpmDomElement = document.getElementById(TYPED_TEXT_WPM_DOM_ELEMENT_ID);
    this.typedTextErrorsDomElement = document.getElementById(TYPED_TEXT_ERRORS_DOM_ELEMENT_ID);
    this.addCustomEventListener(END_TYPING_EVENT, this.handleEndTypingEvent.bind(this));
    const appStorage = this.getAppStorage();
    if (appStorage.textToTypeStats.length > 0) {
      this.updateStats(appStorage.textToTypeStats[0]);
    };
  }

  private handleEndTypingEvent(event) {
    this.updateStats(event.detail);
  }

  private updateStats(stat: TextToTypeStats) {
    if(stat) {
      this.typedTextSecondsDomElement.innerHTML = '' + stat.seconds;
      this.typedTextWpmDomElement.innerHTML = '' + stat.wpm;
      this.typedTextErrorsDomElement.innerHTML = '' + stat.errors;
    }
  }

}

