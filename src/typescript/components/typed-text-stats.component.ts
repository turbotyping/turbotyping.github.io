import { PROGRESS_DIV_ID } from '../constants/constant';
import { APP_SETTINGS_CHANGE_EVENT, END_TYPING_EVENT } from '../constants/event.constant';
import { AppStorage } from '../models/app-storage.model';
import { TypedTextStats } from '../models/typed-text-stats.model';
import { BaseBlockHtmlComponent } from './base/base-block-component';

const TYPED_TEXT_WPM_DOM_ELEMENT_ID = 'TypedTextWpm';
const TYPED_TEXT_ERRORS_DOM_ELEMENT_ID = 'TypedTextErrors';

export class TypedTextHtmlComponent extends BaseBlockHtmlComponent {
  private typedTextWpmDomElement: HTMLElement;
  private typedTextErrorsDomElement: HTMLElement;
  private previousTextTextToTypeId: string;
  private previousTextTextToType: HTMLElement;
  private nextTextTextToTypeId: string;
  private nextTextTextToType: HTMLElement;

  __preInsertHtml(): void {
    this.previousTextTextToTypeId = this.getRandomId();
    this.nextTextTextToTypeId = this.getRandomId();
  }

  __toHtml() {
    return /* html */ `
      <div class="typed-text-stats-container">
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
        <div class="typed-text-stat-container change-text-to-type">
          <span id="${this.previousTextTextToTypeId}" class="iconify-container previous"><span class="iconify" data-icon="eva:arrow-ios-back-outline" data-inline="false"></span></span>
          <span id="${this.nextTextTextToTypeId}" class="iconify-container next"><span class="iconify" data-icon="eva:arrow-ios-forward-fill" data-inline="false"></span></span>
        </div>
      </div>
    `;
  }

  __postInsertHtml(): void {
    this.typedTextWpmDomElement = document.getElementById(TYPED_TEXT_WPM_DOM_ELEMENT_ID);
    this.typedTextErrorsDomElement = document.getElementById(TYPED_TEXT_ERRORS_DOM_ELEMENT_ID);
    this.previousTextTextToType = document.getElementById(this.previousTextTextToTypeId);
    this.nextTextTextToType = document.getElementById(this.nextTextTextToTypeId);
    this.previousTextTextToType.addEventListener('click', this.handlePreviousTextTextToTypeClickEvent.bind(this));
    this.nextTextTextToType.addEventListener('click', this.handleNextTextTextToTypeClickEvent.bind(this));
    this.addCustomEventListener(END_TYPING_EVENT, this.handleEndTypingEvent.bind(this));
    const appStorage = this.getAppStorage();
    if (appStorage.typedTextStats.length > 0) {
      this.updateStats(appStorage.typedTextStats[appStorage.typedTextStats.length - 1]);
    }
  }

  private handlePreviousTextTextToTypeClickEvent() {
    const appStorage = this.getAppStorage();
    appStorage.textToTypeIndex = AppStorage.previousTextToTypeIndex(appStorage);
    this.saveAppStorage(appStorage);
    this.dispatchCustomEvent(APP_SETTINGS_CHANGE_EVENT);
  }

  private handleNextTextTextToTypeClickEvent() {
    const appStorage = this.getAppStorage();
    appStorage.textToTypeIndex = AppStorage.nextTextToTypeIndex(appStorage);
    this.saveAppStorage(appStorage);
    this.dispatchCustomEvent(APP_SETTINGS_CHANGE_EVENT);
  }

  private handleEndTypingEvent(event) {
    this.updateStats(event.detail);
  }

  private updateStats(stat: TypedTextStats) {
    if (stat) {
      this.animateValue(this.typedTextWpmDomElement, stat.wpm);
      this.animateValue(this.typedTextErrorsDomElement, stat.errors);
    }
  }

  private animateValue(domElement: HTMLElement, value: number, duration: number = 700) {
    domElement.innerHTML = '' + 0;
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
