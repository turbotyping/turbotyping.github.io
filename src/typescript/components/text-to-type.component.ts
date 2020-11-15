import { BaseHtmlComponent } from "./component";
import englishQuotes from '../data/english-quotes';
import { TypedTextStats } from "../models/typed-text-stats.model";
import { END_TYPING_EVENT } from "../constants/constant";
import { AppStorage } from "../models/app-storage.model";

const TEXT_TO_TYPE_DOM_ELEMENT_ID = "TextToType"
const CHARS_To_TYPE: RegExp = /^[A-Za-z0-9é"'\(-è_çà\)=:/;.,?<>!~#{\[|@\]}+ ]$/;

export class TextToTypeHtmlComponent extends BaseHtmlComponent {

  private textToTypeDomElement: HTMLElement;
  private currentCharToTypeDomElement: HTMLElement;
  private textToTypeIndex: number = -1;
  private blinkInterval: any;
  private nextCurrentCharToTypeCssClass = 'OK';
  private stats: TypedTextStats;
  private appStorage: AppStorage;

  _toHtml() {
    return `<div id="${TEXT_TO_TYPE_DOM_ELEMENT_ID}" class="text-to-type"></div>`;
  }

  protected _postInsertHtml(): void {
    this.textToTypeDomElement = document.getElementById(TEXT_TO_TYPE_DOM_ELEMENT_ID);
    this.appStorage = this.getAppStorage();
    this.textToTypeIndex = this.appStorage.textToTypeIndex;
    this.setTextToType();
    document.body.addEventListener('keydown', this.handleKeyDownEvent.bind(this));
  }

  private handleKeyDownEvent(event) {
    this.stats.handleKeyDownEvent();
    const char = event.key;
    const expectedChar = this.currentCharToTypeDomElement.dataset.key;
    if (char === ' ') event.preventDefault();
    if (!CHARS_To_TYPE.test(char)) return;
    if (expectedChar !== char) {
      this.nextCurrentCharToTypeCssClass = 'NOK';
      this.stats.increaseErrors();
      return;
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
      this.dispatchCustomEvent(END_TYPING_EVENT, this.stats);
      this.textToTypeIndex = (this.textToTypeIndex + 1) % englishQuotes.length;
      this.updateAppStorage();
      this.setTextToType();
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

  private toggleBlinkCssClass() {
    this.textToTypeDomElement.classList.toggle('blink');
  }

  private setTextToType(): void {
    const textToTypeCharArray = englishQuotes[this.textToTypeIndex].split('');
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

