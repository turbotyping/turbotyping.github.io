import { BaseBlockHtmlComponent } from './base/base-block-component';
import prophetMohamedPbuhQuotes from '../data/prophet-mohamed-pbuh-quotes';
import commonEnglishQuotes from '../data/common-english-quotes';
import { TypedTextStats } from '../models/typed-text-stats.model';
import { APP_SETTINGS_CHANGE_EVENT, END_TYPING_EVENT } from '../constants/event.constant';
import { TextToTypeCategory } from '../models/text-to-type-category.enum';

const BACKSPACE_KEY = 'Backspace';
const SPACE_KEY = ' ';
const TEXT_TO_TYPE_DOM_ELEMENT_ID = 'TextToType';
const CHARS_To_TYPE: RegExp = /^[A-Za-z0-9é"'\(-è_çà\)=:/;.,?<>!~#{\[|@\]}+ ]$/;

export class TextToTypeHtmlComponent extends BaseBlockHtmlComponent {
  private textToTypeDomElement: HTMLElement;
  private currentCharToTypeDomElement: HTMLElement;
  private blinkInterval: any;
  private nextCurrentCharToTypeCssClass = 'OK';
  private stats: TypedTextStats;
  private keyboardSound: HTMLAudioElement;

  __preInsertHtml(): void {
    this.keyboardSound = new Audio('keyboard-press-sound-effect.mp3');
  }

  __toHtml() {
    return `<div id="${TEXT_TO_TYPE_DOM_ELEMENT_ID}" class="text-to-type"></div>`;
  }

  __postInsertHtml(): void {
    const appStorage = this.getAppStorage();
    appStorage.textToTypeCategory = appStorage.textToTypeCategory || TextToTypeCategory.PROPHET_MOHAMED_PBUH_QUOTES;
    this.saveAppStorage(appStorage);
    this.textToTypeDomElement = document.getElementById(TEXT_TO_TYPE_DOM_ELEMENT_ID);
    this.setTextToType();
    document.body.addEventListener('keydown', this.handleKeyDownEvent.bind(this));
    this.addCustomEventListener(APP_SETTINGS_CHANGE_EVENT, this.handleAppSettingsChangeEvent.bind(this));
  }

  private handleAppSettingsChangeEvent() {
    this.setTextToType();
  }

  private handleKeyDownEvent(event) {
    this.stats.handleKeyDownEvent();
    const typedKey = event.key;
    this.handleKeySounds(typedKey);
    if (typedKey === SPACE_KEY) event.preventDefault();
    if (typedKey === BACKSPACE_KEY) {
      const previousCharToType = this.getPreviousCharToType();
      if (previousCharToType) {
        this.currentCharToTypeDomElement.classList.remove('cursor');
        this.currentCharToTypeDomElement = previousCharToType;
        this.currentCharToTypeDomElement.classList.remove('OK', 'NOK');
        this.currentCharToTypeDomElement.classList.add('cursor');
      }
      return;
    }
    if (!CHARS_To_TYPE.test(typedKey)) return;

    const expectedKey = this.currentCharToTypeDomElement.dataset.key;
    if (expectedKey !== typedKey) {
      this.nextCurrentCharToTypeCssClass = 'NOK';
      this.stats.increaseErrors();
      if (this.getAppStorage().stopOnError) return;
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
    } else {
      this.stats.endType();
      this.updateAppStorageOnEndTyping();
      this.dispatchCustomEvent(END_TYPING_EVENT, this.stats);
      this.setTextToType();
    }
  }

  private handleKeySounds(typedKey: string) {
    if (this.getAppStorage().enableSounds && (CHARS_To_TYPE.test(typedKey) || typedKey === BACKSPACE_KEY)) {
      this.keyboardSound.pause();
      this.keyboardSound.currentTime = 0.15;
      this.keyboardSound.play();
    }
  }

  private updateAppStorageOnEndTyping() {
    const appStorage = this.getAppStorage();
    appStorage.textToTypeIndex = (appStorage.textToTypeIndex + 1) % this.getTextsToTypeLength();
    appStorage.typedTextStats.push(this.stats);
    this.saveAppStorage(appStorage);
  }

  private getNextCharToType(): HTMLElement {
    let res = this.currentCharToTypeDomElement.nextElementSibling;
    while (res?.tagName === 'WBR') {
      res = res.nextElementSibling;
    }
    return res as HTMLElement;
  }

  private getPreviousCharToType(): HTMLElement {
    let res = this.currentCharToTypeDomElement.previousElementSibling;
    while (res?.tagName === 'WBR') {
      res = res.previousElementSibling;
    }
    return res as HTMLElement;
  }

  private toggleBlinkCssClass() {
    this.textToTypeDomElement.classList.toggle('blink');
  }

  private async setTextToType() {
    clearInterval(this.blinkInterval);
    const appStorage = this.getAppStorage();
    let textToType = await this.getTextToType();
    if (!appStorage.enableCapitalLetters) {
      textToType = textToType.toLowerCase();
    }
    if (!appStorage.enablePunctuationCharacters) {
      textToType = textToType.replace(/[^A-Za-z ]/g, '');
    }
    const textToTypeCharArray = textToType.split('');
    this.textToTypeDomElement.innerHTML = `${textToTypeCharArray.map(this.charToSpan).join('')}`;
    this.currentCharToTypeDomElement = this.textToTypeDomElement.querySelector('span');
    this.currentCharToTypeDomElement.classList.add('cursor');
    this.textToTypeDomElement.classList.add('blink');
    this.blinkInterval = setInterval(this.toggleBlinkCssClass.bind(this), 350);
    this.stats = new TypedTextStats(textToTypeCharArray.length);
  }

  private charToSpan(c: string) {
    if (c === ' ') return `<span data-key=" " class="whitespace">␣</span><wbr>`;
    return `<span data-key="${c}">${c}</span>`;
  }

  private async getTextToType(): Promise<string> {
    const appStorage = this.getAppStorage();
    if (appStorage.textToTypeCategory === TextToTypeCategory.ENGLISH_QURAN) {
      return await fetch(`https://api.alquran.cloud/v1/ayah/${appStorage.textToTypeIndex + 1}/en.asad`)
        .then((response) => response.json())
        .then((response) => response.data.text);
    }
    if (appStorage.textToTypeCategory === TextToTypeCategory.FRENCH_QURAN) {
      return await fetch(`https://api.alquran.cloud/v1/ayah/${appStorage.textToTypeIndex + 1}/fr.hamidullah`)
        .then((response) => response.json())
        .then((response) => response.data.text);
    }
    if (appStorage.textToTypeCategory === TextToTypeCategory.PROPHET_MOHAMED_PBUH_QUOTES) {
      return prophetMohamedPbuhQuotes[appStorage.textToTypeIndex];
    }
    if (appStorage.textToTypeCategory === TextToTypeCategory.COMMON_ENGLISH_QUOTES) {
      return commonEnglishQuotes[appStorage.textToTypeIndex].quote;
    }
    return 'Sunt cillum est dolore veniam officia.';
  }

  private getTextsToTypeLength(): number {
    const appStorage = this.getAppStorage();
    if (appStorage.textToTypeCategory === TextToTypeCategory.PROPHET_MOHAMED_PBUH_QUOTES) {
      return prophetMohamedPbuhQuotes.length;
    }
    if (appStorage.textToTypeCategory === TextToTypeCategory.COMMON_ENGLISH_QUOTES) {
      return commonEnglishQuotes.length;
    }
    return Number.MAX_VALUE;
  }
}
