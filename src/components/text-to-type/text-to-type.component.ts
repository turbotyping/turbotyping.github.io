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
} from '../../constants/constant';
import { BaseHtmlComponent } from '../_core/base-component';
import { TypedKeyStats } from '../typed-keys/typed-key-stats.model';
import { TextToTypeCategory } from '../../state/text-to-type-category.enum';
import { TypedTextStats } from '../typed-text-stats/typed-text-stats.model';
import { TextToTypeLanguage } from '../../state/text-to-type-language.enum';
import { IAppStateClient } from '../../state/app-state.client.interface';

const INACTIVITY_TIMEOUT = 10000;
const BACKSPACE_KEY = 'Backspace';
const SPACE_KEY = ' ';
const ENTER_KEY = 'Enter';
const TEXT_TO_TYPE_DOM_ELEMENT_ID = 'TextToTypeId';
const CHARS_To_TYPE: RegExp = /(^[A-Za-z0-9é"'\(-èëê_çàôùœâ\)=:/;.,?<>!~#{\[|@\]}+% ]$|Enter)/;
const CHARS_To_TYPE_WITHOUT_PUNCTUATION: RegExp = /[^A-Za-z0-9àçéèëêôùœâ\n ]/g;

export class TextToTypeHtmlComponent extends BaseHtmlComponent {
  private textToTypeDomElement: HTMLElement;
  private currentCharToTypeDomElement: HTMLElement;
  private blinkInterval: any;
  private inactivityTimeout: any;
  private nextCurrentCharToTypeCssClass = 'OK';
  private typedTextStats: TypedTextStats;
  private typedKeysStats: Map<string, TypedKeyStats>;
  private keyboardSound: HTMLAudioElement;
  private isDisabled: boolean = false;

  constructor(private appStateClient: IAppStateClient) {
    super();
  }

  preInsertHtml(): void {
    this.keyboardSound = new Audio('keyboard-press-sound-effect.mp3');
  }

  toHtml() {
    return /* html */ `
      <div id="${TEXT_TO_TYPE_DOM_ELEMENT_ID}" class="text-to-type"></div>
    `;
  }

  postInsertHtml(): void {
    const appStorage = this.appStateClient.getAppState();
    appStorage.textToTypeLanguage = appStorage.textToTypeLanguage || TextToTypeLanguage.ENGLISH;
    this.appStateClient.saveAppState(appStorage);
    this.textToTypeDomElement = document.getElementById(TEXT_TO_TYPE_DOM_ELEMENT_ID);
    this.setTextToType();
    document.body.addEventListener('keydown', this.handleKeyDownEvent.bind(this));
    this.addCustomEventListener(APP_SETTINGS_CHANGE_EVENT, this.reset.bind(this));
    this.addCustomEventListener(START_UPDATING_APP_SETTINGS_EVENT, this.disable.bind(this));
    this.addCustomEventListener(END_UPDATING_APP_SETTINGS_EVENT, this.enable.bind(this));
    this.addCustomEventListener(START_UPDATING_CUSTOM_TEXT_TO_TYPE_EVENT, this.disable.bind(this));
    this.addCustomEventListener(END_UPDATING_CUSTOM_TEXT_TO_TYPE_EVENT, this.enable.bind(this));
    this.addCustomEventListener(CUSTOM_TEXTS_UPDATE_EVENT, this.reset.bind(this));
  }

  private disable() {
    this.textToTypeDomElement.classList.add('disabled');
    this.isDisabled = true;
  }

  private enable() {
    this.textToTypeDomElement.classList.remove('disabled');
    this.isDisabled = false;
  }

  private reset() {
    this.setTextToType();
  }

  private handleKeyDownEvent(event) {
    if (this.isDisabled) return;
    console.log(event.key);
    event.preventDefault();
    clearTimeout(this.inactivityTimeout);
    this.inactivityTimeout = setTimeout(this.setTextToType.bind(this), INACTIVITY_TIMEOUT);
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
      window.scrollTo(0, 0);
      this.typedKeysStats = this.typedTextStats.endType();
      this.updateAppStorageOnEndTyping();
      this.dispatchCustomEvent(END_TYPING_EVENT, this.typedTextStats);
      this.setTextToType();
    }
  }

  private scrollDownWhenNecessary() {
    const windowHeight = window.innerHeight;
    const top = this.currentCharToTypeDomElement.getBoundingClientRect().top;
    if (top > (2 * windowHeight) / 3) {
      window.scrollBy(0, 30);
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

  private async setTextToType() {
    clearInterval(this.blinkInterval);
    const appState = this.appStateClient.getAppState();
    let textToType = this.getTextToType();
    if (!appState.enableCapitalLetters) {
      textToType = textToType.toLowerCase();
    }
    if (!appState.enablePunctuationCharacters) {
      textToType = textToType.replace(CHARS_To_TYPE_WITHOUT_PUNCTUATION, '');
    }
    textToType = textToType.substring(0, appState.maxCharactersToType);
    textToType = textToType.trim();
    const textToTypeLength = textToType.split('').length;
    let textToTypeCharArrayAfterTransformation = [];
    if (appState.textToTypeCategory != TextToTypeCategory.CODE || appState.visitWebsiteForTheFirstTime) {
      textToType = textToType.replace(/ +/g, ' ');
      textToTypeCharArrayAfterTransformation = textToType.split('').map((c) => this.charToSpan(c, ''));
    } else {
      textToType = hljs.highlight(appState.textToTypeLanguage, textToType).value;
      textToType = textToType.replace(/&lt;/g, '<');
      textToType = textToType.replace(/&gt;/g, '>');
      textToType = textToType.replace(/&quot;/g, '"');
      const textToTypeCharArray = textToType.split('');
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

  private getTextToType(): string {
    const appState = this.appStateClient.getAppState();
    const textToTypeArray = this.appStateClient.getTextToTypeArray();
    if (textToTypeArray.length > 0) {
      return textToTypeArray[appState.textToTypeIndex].text;
    }
    return 'Sunt cillum est dolore veniam officia.';
  }
}
