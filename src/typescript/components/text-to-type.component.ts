import { BaseBlockHtmlComponent } from './base/base-block-component';
import englishQuotes from '../data/english-quotes';
import prophetMohamedPbuhQuotes from '../data/prophet-mohamed-pbuh-quotes';
import { TypedTextStats } from '../models/typed-text-stats.model';
import { AppStorage } from '../models/app-storage.model';
import { APP_SETTINGS_CHANGE_EVENT, END_TYPING_EVENT } from '../constants/event.constant';

const BACKSPACE_KEY = 'Backspace';
const SPACE_KEY = ' ';
const TEXT_TO_TYPE_DOM_ELEMENT_ID = 'TextToType';
const CHARS_To_TYPE: RegExp = /^[A-Za-z0-9é"'\(-è_çà\)=:/;.,?<>!~#{\[|@\]}+ ]$/;

export class TextToTypeHtmlComponent extends BaseBlockHtmlComponent {
  private textToTypeDomElement: HTMLElement;
  private currentCharToTypeDomElement: HTMLElement;
  private textToTypeIndex: number = -1;
  private blinkInterval: any;
  private nextCurrentCharToTypeCssClass = 'OK';
  private stats: TypedTextStats;
  private appStorage: AppStorage;
  private keyboardSound: HTMLAudioElement;

  __preInsertHtml(): void {
    this.keyboardSound = new Audio('keyboard-press-sound-effect.mp3');
  }

  __toHtml() {
    return `<div id="${TEXT_TO_TYPE_DOM_ELEMENT_ID}" class="text-to-type"></div>`;
  }

  __postInsertHtml(): void {
    this.textToTypeDomElement = document.getElementById(TEXT_TO_TYPE_DOM_ELEMENT_ID);
    this.appStorage = this.getAppStorage();
    this.textToTypeIndex = this.appStorage.textToTypeIndex;
    this.setTextToType();
    document.body.addEventListener('keydown', this.handleKeyDownEvent.bind(this));
    this.addCustomEventListener(APP_SETTINGS_CHANGE_EVENT, this.handleAppSettingsChangeEvent.bind(this));
  }

  private handleAppSettingsChangeEvent() {
    this.setTextToType();
  }

  private handleKeyDownEvent(event) {
    this.stats.handleKeyDownEvent();
    this.handleKeySounds();
    const typedKey = event.key;
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
      this.updateAppStorage();
      this.dispatchCustomEvent(END_TYPING_EVENT, this.stats);
      this.textToTypeIndex = (this.textToTypeIndex + 1) % englishQuotes.length;
      this.setTextToType();
    }
  }

  private handleKeySounds() {
    if (this.getAppStorage().enableSounds) {
      this.keyboardSound.pause();
      this.keyboardSound.currentTime = 0.15;
      this.keyboardSound.play();
    }
  }

  private updateAppStorage() {
    this.appStorage.textToTypeIndex = this.textToTypeIndex;
    this.appStorage.typedTextStats.push(this.stats);
    this.saveAppStorage(this.appStorage);
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

  private setTextToType(): void {
    clearInterval(this.blinkInterval);
    const appStorage = this.getAppStorage();
    let textToType = prophetMohamedPbuhQuotes[this.textToTypeIndex];
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
}
