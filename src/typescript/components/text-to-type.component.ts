import { BaseBlockHtmlComponent } from './base/base-block-component';
import englishQuotes from '../data/quotes.english';
import frenchQuotes from '../data/quotes.french';
import englishPoems from '../data/poems.english';
import frenchPoems from '../data/poems.french';
import { TypedTextStats } from '../models/typed-text-stats.model';
import { APP_SETTINGS_CHANGE_EVENT, END_TYPING_EVENT } from '../constants/event.constant';
import { TextToTypeLanguage } from '../models/text-to-type-language.enum';
import { TextToTypeCategory } from '../models/text-to-type-category.enum';
import { TextToType } from '../models/text-to-type.model';

const INACTIVITY_TIMEOUT = 8000;
const BACKSPACE_KEY = 'Backspace';
const SPACE_KEY = ' ';
const ENTER_KEY = 'Enter';
const TEXT_TO_TYPE_DOM_ELEMENT_ID = 'TextToType';
const CHARS_To_TYPE: RegExp = /(^[A-Za-z0-9é"'\(-èëê_çàôùœâ\)=:/;.,?<>!~#{\[|@\]}+ ]$|Enter)/;
const CHARS_To_TYPE_WITHOUT_PUNCTUATION: RegExp = /[^A-Za-z0-9àçéèëêôùœâ\n ]/g;

export class TextToTypeHtmlComponent extends BaseBlockHtmlComponent {
  private textToTypeDomElement: HTMLElement;
  private currentCharToTypeDomElement: HTMLElement;
  private blinkInterval: any;
  private inactivityTimeout: any;
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
    appStorage.textToTypeLanguage = appStorage.textToTypeLanguage || TextToTypeLanguage.ENGLISH;
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
    clearTimeout(this.inactivityTimeout);
    this.inactivityTimeout = setTimeout(this.setTextToType.bind(this), INACTIVITY_TIMEOUT);
    const typedKey = event.key;
    this.handleKeySounds(typedKey);
    if (typedKey === SPACE_KEY) event.preventDefault();
    if (typedKey === BACKSPACE_KEY) {
      const previousCharToType = this.getPreviousCharToType();
      if (previousCharToType) {
        this.currentCharToTypeDomElement.classList.remove('cursor');
        this.currentCharToTypeDomElement = previousCharToType;
        if (this.currentCharToTypeDomElement.classList.contains('NOK')) {
          this.stats.decreaseErrors();
        }
        this.currentCharToTypeDomElement.classList.remove('OK', 'NOK');
        this.currentCharToTypeDomElement.classList.add('cursor');
      }
      return;
    }
    if (!CHARS_To_TYPE.test(typedKey)) return;

    const expectedKeyRegex = new RegExp(this.currentCharToTypeDomElement.dataset.keyRegex);
    if (!expectedKeyRegex.test(typedKey)) {
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
    const appStorage = this.getAppStorage();
    let textToType = this.getTextToType();
    if (!appStorage.enableCapitalLetters) {
      textToType = textToType.toLowerCase();
    }
    if (!appStorage.enablePunctuationCharacters) {
      textToType = textToType.replace(CHARS_To_TYPE_WITHOUT_PUNCTUATION, '');
    }
    textToType = textToType.replace(/ +/g, ' ');
    const textToTypeCharArray = textToType.split('');
    this.textToTypeDomElement.innerHTML = `${textToTypeCharArray.map(this.charToSpan).join('')}`;
    this.currentCharToTypeDomElement = this.textToTypeDomElement.querySelector('span');
    this.currentCharToTypeDomElement.classList.add('cursor');
    this.textToTypeDomElement.classList.add('blink');
    this.blinkInterval = setInterval(this.toggleBlinkCssClass.bind(this), 350);
    this.stats = new TypedTextStats(textToTypeCharArray.length);
  }

  private charToSpan(c: string) {
    if (c === ' ') return `<span data-key-regex="${SPACE_KEY}" class="whitespace">␣</span><wbr>`;
    if (c === '\n') return `<span data-key-regex="${ENTER_KEY}" class="whitespace">↵</span><br>`;
    if (c === '"') return `<span data-key-regex='"'>"</span>`;
    if (c === 'é') return `<span data-key-regex='[ée]'>é</span>`;
    if (c === 'è') return `<span data-key-regex='[èe]'>è</span>`;
    if (c === 'ê') return `<span data-key-regex='[êe]'>ê</span>`;
    if (c === 'ë') return `<span data-key-regex='[ëe]'>ë</span>`;
    if (c === 'à') return `<span data-key-regex='[àa]'>à</span>`;
    if (c === 'ç') return `<span data-key-regex='[çc]'>ç</span>`;
    if (c === 'ô') return `<span data-key-regex='[ôo]'>ô</span>`;
    if (c === 'ù') return `<span data-key-regex='[ùu]'>ù</span>`;
    if (c === 'œ') return `<span data-key-regex='[œoe]'>œ</span>`;
    if (c === 'â') return `<span data-key-regex='[âa]'>â</span>`;
    return `<span data-key-regex="${c}">${c}</span>`;
  }

  private getTextToType(): string {
    const appStorage = this.getAppStorage();
    const textToTypeArray = this.getTextToTypeArray();
    if (textToTypeArray.length > 0) {
      return textToTypeArray[appStorage.textToTypeIndex].text;
    }
    return 'Sunt cillum est dolore veniam officia.';
  }

  private getTextsToTypeLength(): number {
    const textToTypeArray = this.getTextToTypeArray();
    if (textToTypeArray.length > 0) {
      return textToTypeArray.length;
    }
    return Number.MAX_VALUE;
  }

  private getTextToTypeArray(): TextToType[] {
    const appStorage = this.getAppStorage();
    if (appStorage.textToTypeLanguage === TextToTypeLanguage.ENGLISH && appStorage.textToTypeCategory === TextToTypeCategory.QUOTES) {
      return englishQuotes;
    }
    if (appStorage.textToTypeLanguage === TextToTypeLanguage.ENGLISH && appStorage.textToTypeCategory === TextToTypeCategory.POEMS) {
      return englishPoems;
    }
    if (appStorage.textToTypeLanguage === TextToTypeLanguage.FRENCH && appStorage.textToTypeCategory === TextToTypeCategory.QUOTES) {
      return frenchQuotes;
    }
    if (appStorage.textToTypeLanguage === TextToTypeLanguage.FRENCH && appStorage.textToTypeCategory === TextToTypeCategory.POEMS) {
      return frenchPoems;
    }
    return [];
  }
}
