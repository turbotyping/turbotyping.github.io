import './typed-text-stats.scss';
import { CHANGE_TEXT_TO_TYPE, END_TYPING_EVENT, ENTER_KEY_CODE } from '../../constants/constant';
import { BaseHtmlComponent } from '../_core/base-component';
import { TypedTextStats } from './typed-text-stats.model';
import { IAppStateClient } from '../../state/app-state.client.interface';

const TYPED_TEXT_WPM_DOM_ELEMENT_ID = 'TypedTextWpm';
const TYPED_TEXT_ERRORS_DOM_ELEMENT_ID = 'TypedTextErrors';

export class TypedTextStatsHtmlComponent extends BaseHtmlComponent {
  private typedTextWpmDomElement: HTMLElement;
  private typedTextErrorsDomElement: HTMLElement;
  private previousTextTextToTypeId: string;
  private previousTextTextToType: HTMLElement;
  private nextTextTextToTypeId: string;
  private nextTextTextToType: HTMLElement;

  constructor(private appStateClient: IAppStateClient) {
    super();
  }

  preInsertHtml(): void {
    this.previousTextTextToTypeId = this.generateId();
    this.nextTextTextToTypeId = this.generateId();
  }

  toHtml() {
    return /* html */ `
      <div class="typed-text-stats-container">
        <div id="${this.previousTextTextToTypeId}" tabindex="0" class="typed-text-stat-container change-text-to-type">
          <span class="iconify-container previous"><span class="iconify" data-icon="eva:arrow-ios-back-outline" data-inline="false"></span></span>
        </div>
        <div class="typed-text-stat-container">
          <span id="${TYPED_TEXT_WPM_DOM_ELEMENT_ID}" class="typed-text-stat-value">0</span>
          <span class="typed-text-stat-label">word/min</span>
        </div>
        <div class="typed-text-stat-container">
          <span id="${TYPED_TEXT_ERRORS_DOM_ELEMENT_ID}" class="typed-text-stat-value">0</span>
          <span class="typed-text-stat-label">errors</span>
        </div>
        <div id="${this.nextTextTextToTypeId}" tabindex="0" class="typed-text-stat-container change-text-to-type">
          <span class="iconify-container next"><span class="iconify" data-icon="eva:arrow-ios-forward-fill" data-inline="false"></span></span>
        </div>
      </div>
    `;
  }

  postInsertHtml(): void {
    this.typedTextWpmDomElement = document.getElementById(TYPED_TEXT_WPM_DOM_ELEMENT_ID);
    this.typedTextErrorsDomElement = document.getElementById(TYPED_TEXT_ERRORS_DOM_ELEMENT_ID);
    this.previousTextTextToType = document.getElementById(this.previousTextTextToTypeId);
    this.nextTextTextToType = document.getElementById(this.nextTextTextToTypeId);
    this.previousTextTextToType.addEventListener('click', this.handlePreviousTextTextToTypeClickEvent.bind(this));
    this.previousTextTextToType.addEventListener('keydown', this.handlePreviousTextTextToTypeKeyDownEvent.bind(this));
    this.nextTextTextToType.addEventListener('click', this.handleNextTextTextToTypeClickEvent.bind(this));
    this.nextTextTextToType.addEventListener('keydown', this.handleNextTextTextToTypeKeyDownEvent.bind(this));
    this.addCustomEventListener(END_TYPING_EVENT, this.handleEndTypingEvent.bind(this));
    const appStorage = this.appStateClient.getAppState();
    if (appStorage.typedTextsStats.length > 0) {
      this.updateStats(appStorage.typedTextsStats[appStorage.typedTextsStats.length - 1]);
    }
  }

  private handlePreviousTextTextToTypeKeyDownEvent(event) {
    if (event.keyCode !== ENTER_KEY_CODE) {
      return;
    }
    event.stopPropagation();
    this.previousTextTextToType.dispatchEvent(new Event('click'));
  }

  private handlePreviousTextTextToTypeClickEvent() {
    const appState = this.appStateClient.getAppState();
    appState.textToTypeIndex = this.appStateClient.previousTextToTypeIndex();
    this.appStateClient.saveAppState(appState);
    this.dispatchCustomEvent(CHANGE_TEXT_TO_TYPE);
  }

  private handleNextTextTextToTypeKeyDownEvent(event) {
    if (event.keyCode !== ENTER_KEY_CODE) {
      return;
    }
    event.stopPropagation();
    this.nextTextTextToType.dispatchEvent(new Event('click'));
  }

  private handleNextTextTextToTypeClickEvent() {
    const appState = this.appStateClient.getAppState();
    appState.textToTypeIndex = this.appStateClient.nextTextToTypeIndex();
    this.appStateClient.saveAppState(appState);
    this.dispatchCustomEvent(CHANGE_TEXT_TO_TYPE);
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
