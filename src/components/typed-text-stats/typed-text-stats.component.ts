import './typed-text-stats.scss';
import { PROGRESS_DIV_ID, APP_SETTINGS_CHANGE_EVENT, END_TYPING_EVENT, VISIT_WEBSITE_FOR_THE_FIRST_TIME } from '../_constants/constant';
import { BaseHtmlComponent } from '../_core/base-component';
import { TypedTextStats } from './typed-text-stats.model';
import { IAppStateClient } from '../_state/app-state.client.interface';

const TYPED_TEXT_WPM_DOM_ELEMENT_ID = 'TypedTextWpm';
const TYPED_TEXT_ERRORS_DOM_ELEMENT_ID = 'TypedTextErrors';

export class TypedTextHtmlComponent extends BaseHtmlComponent {
  private typedTextWpmDomElement: HTMLElement;
  private typedTextErrorsDomElement: HTMLElement;
  private previousTextTextToTypeId: string;
  private previousTextTextToType: HTMLElement;
  private nextTextTextToTypeId: string;
  private nextTextTextToType: HTMLElement;
  private typedKeysStatsId: string;
  private typedKeysStats: HTMLElement;

  constructor(private appStateClient: IAppStateClient) {
    super();
  }

  preInsertHtml(): void {
    this.previousTextTextToTypeId = this.generateId();
    this.nextTextTextToTypeId = this.generateId();
    this.typedKeysStatsId = this.generateId();
  }

  toHtml() {
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
      <div id="${this.typedKeysStatsId}" class="typed-keys-stats-container">
      </div>
    `;
  }

  postInsertHtml(): void {
    this.typedKeysStats = document.getElementById(this.typedKeysStatsId);
    this.typedTextWpmDomElement = document.getElementById(TYPED_TEXT_WPM_DOM_ELEMENT_ID);
    this.typedTextErrorsDomElement = document.getElementById(TYPED_TEXT_ERRORS_DOM_ELEMENT_ID);
    this.previousTextTextToType = document.getElementById(this.previousTextTextToTypeId);
    this.nextTextTextToType = document.getElementById(this.nextTextTextToTypeId);
    this.previousTextTextToType.addEventListener('click', this.handlePreviousTextTextToTypeClickEvent.bind(this));
    this.nextTextTextToType.addEventListener('click', this.handleNextTextTextToTypeClickEvent.bind(this));
    this.addCustomEventListener(END_TYPING_EVENT, this.handleEndTypingEvent.bind(this));
    const appStorage = this.appStateClient.getAppState();
    if (appStorage.typedTextsStats.length > 0) {
      this.updateStats(appStorage.typedTextsStats[appStorage.typedTextsStats.length - 1]);
    }
    this.updateTypedKeysStats();
  }

  getContainerQuerySelector(): string {
    return '.typed-text-stats-container';
  }

  private handlePreviousTextTextToTypeClickEvent() {
    localStorage.setItem(VISIT_WEBSITE_FOR_THE_FIRST_TIME, 'false');
    const appState = this.appStateClient.getAppState();
    appState.textToTypeIndex = this.appStateClient.previousTextToTypeIndex();
    this.appStateClient.saveAppState(appState);
    this.dispatchCustomEvent(APP_SETTINGS_CHANGE_EVENT);
  }

  private handleNextTextTextToTypeClickEvent() {
    localStorage.setItem(VISIT_WEBSITE_FOR_THE_FIRST_TIME, 'false');
    const appStorage = this.appStateClient.getAppState();
    appStorage.textToTypeIndex = this.appStateClient.nextTextToTypeIndex();
    this.appStateClient.saveAppState(appStorage);
    this.dispatchCustomEvent(APP_SETTINGS_CHANGE_EVENT);
  }

  private handleEndTypingEvent(event) {
    this.updateStats(event.detail);
    this.updateTypedKeysStats();
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

  private updateTypedKeysStats() {
    const appStorage = this.appStateClient.getAppState();
    let html = '';
    'abcdefghijklmnopqrstuvwxyz'.split('').forEach((c) => {
      const keyStats = this.appStateClient.getTypedKeysStatsMap();
      let cssClass = 'no-data-available-yet';
      let title = 'No data available yet';
      if (keyStats && keyStats.get(c)) {
        let stats = keyStats.get(c);
        let statsWpm = stats.filter((s) => s.wpm > 0).map((s) => s.wpm);
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
      html += `<span title="${title}" class="typed-key ${cssClass}">${c.toUpperCase()}</span>`;
    });
    this.typedKeysStats.innerHTML = html;
  }
}
