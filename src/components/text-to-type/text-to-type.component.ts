import './text-to-type.scss';
const hljs = require('./highlight.min.js');
import {
  APP_SETTINGS_CHANGE_EVENT,
  END_TYPING_EVENT,
  END_UPDATING_APP_SETTINGS_EVENT,
  END_UPDATING_CUSTOM_TEXT_TO_TYPE_EVENT,
  CUSTOM_TEXTS_UPDATE_EVENT,
  START_UPDATING_APP_SETTINGS_EVENT,
  START_UPDATING_CUSTOM_TEXT_TO_TYPE_EVENT,
  TRAINING_LESSON_CHANGE_EVENT,
  PROGRESS_DIV_ID,
  OPEN_SIDE_PANEL_EVENT,
  CLOSE_SIDE_PANEL_EVENT,
  CHANGE_TEXT_TO_TYPE,
  SPACE_KEY_CODE,
  QUOTE_KEY_CODE,
  TAB_KEY_CODE,
  ESCAPE_KEY_CODE,
} from '../../constants/constant';
import { BaseHtmlComponent } from '../_core/base-component';
import { TypedKeyStats } from '../typed-keys/typed-key-stats.model';
import { TextToTypeCategory } from '../../state/text-to-type-category.enum';
import { TypedTextStats } from '../typed-text-stats/typed-text-stats.model';
import { TextToTypeSubCategory } from '../../state/text-to-type-sub-category.enum';
import { IAppStateClient } from '../../state/app-state.client.interface';
import { TextToType } from './text-to-type.model';
import { TrainingLessonStats } from '../training/training-lesson-stats.model';
import { TrainingLesson } from '../training/training-lesson.enum';
import { NumericInputHtmlComponent } from '../_core/numeric-input/numeric-input.component';
import { LabeledSwitchHtmlComponent } from '../_core/switch/labled-switch.component';

const INACTIVITY_TIMEOUT = 30000;
const BACKSPACE_KEY = 'Backspace';
const SPACE_KEY = ' ';
const ENTER_KEY = 'Enter';
const TEXT_TO_TYPE_DOM_ELEMENT_ID = 'TextToTypeId';
const TEXT_TO_TYPE_CONTAINER_DOM_ELEMENT_ID = 'TextToTypeContainerId';
const CHARS_To_TYPE: RegExp = /(^[A-Za-z0-9é"'\(-èëê_çàôùœâ\)=:/;.,?<>!~#{\[|@\]}+% ]$|Enter)/;
const CHARS_To_TYPE_WITHOUT_PUNCTUATION: RegExp = /[^A-Za-z0-9àçéèëêôùœâ\n ]/g;

export class TextToTypeHtmlComponent extends BaseHtmlComponent {
  private toggleTypingButtonId: string;
  private toggleTypingButton: HTMLElement;
  private textToTypeDomElement: HTMLElement;
  private textToTypeContainerDomElement: HTMLElement;
  private currentCharToTypeDomElement: HTMLElement;
  private blinkInterval: any;
  private inactivityTimeout: any;
  private nextCurrentCharToTypeCssClass = 'OK';
  private typedTextStats: TypedTextStats;
  private typedKeysStats: Map<string, TypedKeyStats>;
  private keyboardSound: HTMLAudioElement;
  private isDisabled: boolean = false;
  private referenceId: string;
  private reference: HTMLElement;
  private fontSizeInput: NumericInputHtmlComponent;
  private trainingSizeInput: NumericInputHtmlComponent;
  private textToType: TextToType;

  constructor(private appStateClient: IAppStateClient) {
    super();
    this.fontSizeInput = new NumericInputHtmlComponent(this.appStateClient.getFontSize());
    this.trainingSizeInput = new NumericInputHtmlComponent(this.appStateClient.getTrainingSize());
  }

  preInsertHtml(): void {
    this.referenceId = this.generateId();
    this.toggleTypingButtonId = this.generateId();
    this.keyboardSound = new Audio('keyboard-press-sound-effect.mp3');
    this.fontSizeInput.preInsertHtml();
    this.trainingSizeInput.preInsertHtml();
  }

  toHtml() {
    return /* html */ `
      <span class="separator"></span>
      <div class="text-to-type-top-section">
        <span id="${this.referenceId}"></span>
        <div class="text-to-type-ctrl">
          ${this.getTrainingSizeHtml()}
          <span class="label font-size-label">Font size</span>
          ${this.fontSizeInput.toHtml()}
        </div>
      </div>
      <div class="toggle-typing-button-container">
        <button id="${this.toggleTypingButtonId}" class="toggle-typing-button">Click to enable...</button>
      </div>
      <div id="${TEXT_TO_TYPE_CONTAINER_DOM_ELEMENT_ID}" class="text-to-type-container">
        <div id="${TEXT_TO_TYPE_DOM_ELEMENT_ID}" class="text-to-type">
        </div>
      </div>
      <a class="view-typing-progress-link" href="#${PROGRESS_DIV_ID}">
        View typing progress
      </a>
    `;
  }

  postInsertHtml(): void {
    this.toggleTypingButton = document.getElementById(this.toggleTypingButtonId);
    this.reference = document.getElementById(this.referenceId);
    this.textToTypeDomElement = document.getElementById(TEXT_TO_TYPE_DOM_ELEMENT_ID);
    this.textToTypeContainerDomElement = document.getElementById(TEXT_TO_TYPE_CONTAINER_DOM_ELEMENT_ID);

    this.toggleTypingButton.classList.add('hide');
    this.fontSizeInput.postInsertHtml();
    this.fontSizeInput.onUpdate((value) => this.onFontSizeInputChange(value));
    this.postInsertTrainingSizeHtml();
    const appState = this.appStateClient.getAppState();
    appState.textToTypeSubCategory = appState.textToTypeSubCategory || TextToTypeSubCategory.ENGLISH;
    this.appStateClient.saveAppState(appState);
    this.setTextToType(this.getTextToType());
    this.updateFontSize();

    this.textToTypeDomElement.addEventListener('click', this.enable.bind(this));
    this.toggleTypingButton.addEventListener('click', this.enable.bind(this));
    document.body.addEventListener('keydown', this.handleKeyDownEvent.bind(this));
    this.addCustomEventListener(APP_SETTINGS_CHANGE_EVENT, this.reset.bind(this));
    this.addCustomEventListener(START_UPDATING_APP_SETTINGS_EVENT, this.disable.bind(this));
    this.addCustomEventListener(END_UPDATING_APP_SETTINGS_EVENT, this.enable.bind(this));
    this.addCustomEventListener(START_UPDATING_CUSTOM_TEXT_TO_TYPE_EVENT, this.disable.bind(this));
    this.addCustomEventListener(END_UPDATING_CUSTOM_TEXT_TO_TYPE_EVENT, this.enable.bind(this));
    this.addCustomEventListener(CUSTOM_TEXTS_UPDATE_EVENT, this.reset.bind(this));
    this.addCustomEventListener(TRAINING_LESSON_CHANGE_EVENT, this.reset.bind(this));
    this.addCustomEventListener(CHANGE_TEXT_TO_TYPE, this.reset.bind(this));
    this.addCustomEventListener(OPEN_SIDE_PANEL_EVENT, this.disable.bind(this));
    this.addCustomEventListener(CLOSE_SIDE_PANEL_EVENT, this.enable.bind(this));
  }

  private onFontSizeInputChange(newValue: number) {
    const appState = this.appStateClient.getAppState();
    appState.fontSize = newValue;
    this.appStateClient.saveAppState(appState);
    this.updateFontSize();
  }

  private getTrainingSizeHtml() {
    const appState = this.appStateClient.getAppState();
    if (appState.textToTypeCategory !== TextToTypeCategory.TRAINING) {
      return '';
    }
    return /* html */ `
      <span class="label training-size-label">Lesson size</span>
      ${this.trainingSizeInput.toHtml()}
    `;
  }

  private postInsertTrainingSizeHtml() {
    const appState = this.appStateClient.getAppState();
    if (appState.textToTypeCategory == TextToTypeCategory.TRAINING) {
      this.trainingSizeInput.postInsertHtml();
      this.trainingSizeInput.onUpdate((value) => this.onTrainingSizeInputChange(value));
    }
  }

  private onTrainingSizeInputChange(newValue: number) {
    const appState = this.appStateClient.getAppState();
    const oldValue = appState.trainingSize;
    appState.trainingSize = newValue;
    this.appStateClient.saveAppState(appState);
    if (oldValue > newValue) {
      this.textToType.text = this.textToType.text.substring(0, newValue);
    } else {
      const newTextToAdd = this.getTextToType().text.substring(this.textToType.text.length);
      this.textToType.text = this.textToType.text + newTextToAdd;
    }
    this.setTextToType(this.textToType);
  }

  private updateFontSize() {
    const appState = this.appStateClient.getAppState();
    this.textToTypeDomElement.style.fontSize = `${appState.fontSize}px`;
  }

  private disable() {
    this.textToTypeDomElement.classList.add('disabled');
    this.toggleTypingButton.classList.remove('hide');
    this.isDisabled = true;
  }

  private enable() {
    this.textToTypeDomElement.classList.remove('disabled');
    this.toggleTypingButton.classList.add('hide');
    this.isDisabled = false;
  }

  private reset() {
    this.setTextToType(this.getTextToType());
  }

  private handleKeyDownEvent(event) {
    this.disableOnTabKeyDownEvent(event);
    this.enableOnEscapeKeyDownEvent(event);
    if (this.isDisabled) return;
    this.preventSpaceDefaultEvent(event);
    clearTimeout(this.inactivityTimeout);
    this.inactivityTimeout = setTimeout(this.handleInactivityTimeoutEvent.bind(this), INACTIVITY_TIMEOUT);
    const typedKey = event.key;
    const expectedKeyRegex = new RegExp(this.currentCharToTypeDomElement.dataset.keyRegex);
    this.handleKeySounds(typedKey);
    this.typedTextStats.handleKeyDownEvent(typedKey, expectedKeyRegex);
    if (typedKey === BACKSPACE_KEY) {
      const previousCharToType = this.getPreviousCharToType();
      if (previousCharToType) {
        this.currentCharToTypeDomElement.classList.remove('cursor');
        this.currentCharToTypeDomElement = previousCharToType;
        if (this.currentCharToTypeDomElement.classList.contains('NOK')) {
          this.typedTextStats.decreaseErrors();
        }
        this.currentCharToTypeDomElement.classList.remove('OK', 'NOK');
        this.currentCharToTypeDomElement.classList.add('cursor');
      }
      return;
    }
    if (!CHARS_To_TYPE.test(typedKey)) return;
    if (!expectedKeyRegex.test(typedKey)) {
      this.nextCurrentCharToTypeCssClass = 'NOK';
      this.typedTextStats.increaseErrors();
      if (this.appStateClient.getAppState().stopOnError) return;
    }
    clearInterval(this.blinkInterval);
    this.currentCharToTypeDomElement.classList.add(this.nextCurrentCharToTypeCssClass);
    this.currentCharToTypeDomElement.classList.remove('cursor');
    this.currentCharToTypeDomElement = this.getNextCharToType();
    this.nextCurrentCharToTypeCssClass = 'OK';
    if (this.currentCharToTypeDomElement) {
      this.currentCharToTypeDomElement.classList.add('cursor');
      this.textToTypeDomElement.classList.add('blink');
      this.blinkInterval = setInterval(this.toggleBlinkCssClass.bind(this), 350);
      this.scrollDownWhenNecessary();
    } else {
      this.typedKeysStats = this.typedTextStats.endType();
      this.updateAppStorageOnEndTyping();
      this.dispatchCustomEvent(END_TYPING_EVENT, this.typedTextStats);
      this.setTextToType(this.getTextToType());
    }
  }

  private enableOnEscapeKeyDownEvent(event: any) {
    if (event.keyCode == ESCAPE_KEY_CODE) {
      this.enable();
    }
  }

  private disableOnTabKeyDownEvent(event: any) {
    if (event.keyCode == TAB_KEY_CODE) {
      this.disable();
    }
  }

  private handleInactivityTimeoutEvent() {
    if (this.textToType) {
      this.setTextToType(this.textToType);
    } else {
      this.reset();
    }
  }

  private scrollDownWhenNecessary() {
    const windowHeight = window.innerHeight;
    const top = this.currentCharToTypeDomElement.getBoundingClientRect().top;
    if (top > (2 * windowHeight) / 3) {
      this.textToTypeContainerDomElement.scrollBy(0, 30);
    }
  }

  private handleKeySounds(typedKey: string) {
    if (this.appStateClient.getAppState().enableSounds && (CHARS_To_TYPE.test(typedKey) || typedKey === BACKSPACE_KEY)) {
      this.keyboardSound.pause();
      this.keyboardSound.currentTime = 0.15;
      this.keyboardSound.play();
    }
  }

  private updateAppStorageOnEndTyping() {
    const appState = this.appStateClient.getAppState();
    appState.textToTypeIndex = this.appStateClient.nextTextToTypeIndex();
    appState.typedTextsStats.push(this.typedTextStats);
    this.typedKeysStats.forEach((value: TypedKeyStats, key: string) => {
      let typedKeysStatsMap = this.appStateClient.toTypedKeysStatsMap(appState.typedKeysStatsJson);
      if (!typedKeysStatsMap) typedKeysStatsMap = new Map<string, TypedKeyStats[]>();
      let typedKeysStats = typedKeysStatsMap.get(key);
      if (!typedKeysStats) {
        typedKeysStatsMap.set(key, [value]);
      } else {
        typedKeysStatsMap.set(key, [...typedKeysStats, value]);
      }
      appState.typedKeysStatsJson = this.appStateClient.toTypedKeysStatsJson(typedKeysStatsMap);
    });
    if (appState.textToTypeCategory == TextToTypeCategory.TRAINING) {
      let trainingLessonStatsMap = this.appStateClient.toTrainingLessonStatsMap(appState.trainingLessonStatsJson);
      if (!trainingLessonStatsMap) trainingLessonStatsMap = new Map<TrainingLesson, TrainingLessonStats[]>();
      let trainingLessonStats = trainingLessonStatsMap.get(appState.trainingLesson);
      let value = new TrainingLessonStats(this.typedTextStats);
      if (!trainingLessonStats) {
        trainingLessonStatsMap.set(appState.trainingLesson, [value]);
      } else {
        trainingLessonStatsMap.set(appState.trainingLesson, [...trainingLessonStats, value]);
      }
      appState.trainingLessonStatsJson = this.appStateClient.toTrainingLessonStatsJson(trainingLessonStatsMap);
    }

    this.appStateClient.saveAppState(appState);
  }

  private getNextCharToType(): HTMLElement {
    if (this.currentCharToTypeDomElement.dataset.keyRegex === ENTER_KEY) {
      let res = <HTMLElement>this.currentCharToTypeDomElement.nextElementSibling;
      while (res?.tagName === 'WBR' || res?.tagName === 'BR' || res?.dataset.keyRegex === SPACE_KEY) {
        res = <HTMLElement>res.nextElementSibling;
      }
      return res;
    }
    let res = this.currentCharToTypeDomElement.nextElementSibling;
    while (res?.tagName === 'WBR' || res?.tagName === 'BR') {
      res = res.nextElementSibling;
    }
    return res as HTMLElement;
  }

  private getPreviousCharToType(): HTMLElement {
    let res = this.currentCharToTypeDomElement.previousElementSibling;
    while (res?.tagName === 'WBR' || res?.tagName === 'BR') {
      res = res.previousElementSibling;
    }
    return res as HTMLElement;
  }

  private toggleBlinkCssClass() {
    this.textToTypeDomElement.classList.toggle('blink');
  }

  private async setTextToType(textToType: TextToType) {
    this.textToTypeContainerDomElement.scroll(0, 0);
    clearInterval(this.blinkInterval);
    this.textToType = textToType;
    const appState = this.appStateClient.getAppState();
    let textToTypeText = textToType.text;
    this.reference.innerHTML = this.getTextReferenceInnerHtml(textToType);
    if (!appState.enableCapitalLetters) {
      textToTypeText = textToTypeText.toLowerCase();
    }
    if (!appState.enablePunctuationCharacters) {
      textToTypeText = textToTypeText.replace(CHARS_To_TYPE_WITHOUT_PUNCTUATION, '');
    }
    textToTypeText = textToTypeText.trim();
    const textToTypeLength = textToTypeText.split('').length;
    let textToTypeCharArrayAfterTransformation = [];
    if (appState.textToTypeCategory != TextToTypeCategory.CODE || appState.visitWebsiteForTheFirstTime) {
      textToTypeText = textToTypeText.replace(/ +/g, ' ');
      textToTypeCharArrayAfterTransformation = textToTypeText.split('').map((c) => this.charToSpan(c, ''));
    } else {
      textToTypeText = hljs.highlight(appState.textToTypeSubCategory, textToTypeText).value;
      textToTypeText = textToTypeText.replace(/&lt;/g, '<');
      textToTypeText = textToTypeText.replace(/&gt;/g, '>');
      textToTypeText = textToTypeText.replace(/&quot;/g, '"');
      const textToTypeCharArray = textToTypeText.split('');
      let openingSpanBegin = false;
      let closingSpanBegin = false;
      let hljsClass = '';
      for (let index = 0; index < textToTypeCharArray.length; index++) {
        let nextTextToType = textToTypeCharArray.slice(index, index + 100).join('');
        let currentOpeningSpanBegin = /^<span /.test(nextTextToType);
        let currentClosingSpanBegin = /^<\/span>/.test(nextTextToType);
        let spanEnd = /^>/.test(nextTextToType);
        if (currentOpeningSpanBegin) {
          openingSpanBegin = true;
          let occurrence = nextTextToType.match(/"(.+?)"/);
          if (occurrence) {
            hljsClass = occurrence[1];
          }
          continue;
        }
        if (openingSpanBegin) {
          if (spanEnd) openingSpanBegin = false;
          continue;
        }
        if (currentClosingSpanBegin) {
          closingSpanBegin = true;
          continue;
        }
        if (closingSpanBegin) {
          if (spanEnd) closingSpanBegin = false;
          hljsClass = '';
          continue;
        }
        textToTypeCharArrayAfterTransformation.push(this.charToSpan(textToTypeCharArray[index], hljsClass));
      }
    }

    this.textToTypeDomElement.innerHTML = textToTypeCharArrayAfterTransformation.join('');
    this.currentCharToTypeDomElement = this.textToTypeDomElement.querySelector('span');
    this.currentCharToTypeDomElement.classList.add('cursor');
    this.textToTypeDomElement.classList.add('blink');
    this.blinkInterval = setInterval(this.toggleBlinkCssClass.bind(this), 350);
    this.typedTextStats = new TypedTextStats(textToTypeLength);
  }

  private getTextReferenceInnerHtml(text: TextToType): string {
    if (text.reference) {
      return `<span class="text-to-type-reference"><a target="_blank" href="${text.reference}">${text.author}</a></span>`;
    }
    if (text.author) {
      return `<span class="text-to-type-reference">${text.author}</span>`;
    }
    return '';
  }

  private charToSpan(c: string, clazz: string) {
    // if (c === ' ') return `<span data-key-regex="${SPACE_KEY}" class="whitespace">␣</span><wbr>`;
    if (c === ' ') return `<span data-key-regex="${SPACE_KEY}" class="whitespace dot">&middot;</span><wbr>`;
    if (c === '\n') return `<span data-key-regex="${ENTER_KEY}" class="whitespace">↵</span><br>`;
    if (c === '"') return `<span class="${clazz}" data-key-regex='"'>"</span>`;
    if (c === 'é') return `<span class="${clazz}" data-key-regex='[ée]'>é</span>`;
    if (c === 'è') return `<span class="${clazz}" data-key-regex='[èe]'>è</span>`;
    if (c === 'ê') return `<span class="${clazz}" data-key-regex='[êe]'>ê</span>`;
    if (c === 'ë') return `<span class="${clazz}" data-key-regex='[ëe]'>ë</span>`;
    if (c === 'à') return `<span class="${clazz}" data-key-regex='[àa]'>à</span>`;
    if (c === 'ç') return `<span class="${clazz}" data-key-regex='[çc]'>ç</span>`;
    if (c === 'ô') return `<span class="${clazz}" data-key-regex='[ôo]'>ô</span>`;
    if (c === 'ù') return `<span class="${clazz}" data-key-regex='[ùu]'>ù</span>`;
    if (c === 'œ') return `<span class="${clazz}" data-key-regex='[œoe]'>œ</span>`;
    if (c === 'â') return `<span class="${clazz}" data-key-regex='[âa]'>â</span>`;
    if (c === ']') return `<span class="${clazz}" data-key-regex='[\\]]'>]</span>`;
    return `<span class="${clazz}" data-key-regex="[${c}]">${c}</span>`;
  }

  private getTextToType(): TextToType {
    const appState = this.appStateClient.getAppState();
    const textToTypeArray = this.appStateClient.getTextToTypeArray();
    if (textToTypeArray.length > 0) {
      return textToTypeArray[appState.textToTypeIndex];
    }
    return {
      text: 'Sunt cillum est dolore veniam officia.',
      author: 'Lorem Ipsum',
    };
  }

  private preventSpaceDefaultEvent(event: any) {
    if (event.keyCode == SPACE_KEY_CODE || event.keyCode == QUOTE_KEY_CODE) {
      event.preventDefault();
    }
  }
}
