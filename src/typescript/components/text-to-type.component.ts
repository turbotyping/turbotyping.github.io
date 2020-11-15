import { BaseHtmlComponent } from "./component";
import englishQuotes from '../data/english-quotes';

const TEXT_TO_TYPE_DOM_ELEMENT_ID = "TextToType"
const CHARS_To_TYPE: RegExp = /^[A-Za-z0-9é"'\(-è_çà\)=:/;.,?<>!~#{\[|@\]}+ ]$/;

export class TextToTypeHtmlComponent extends BaseHtmlComponent {

  private textToTypeDomElement: HTMLElement;
  private currentCharToTypeDomElement: HTMLElement;
  private textToTypeIndex: number = -1;
  private blinkInterval: any;
  private nextCurrentCharToTypeCssClass = 'OK';

  _toHtml() {
    return `<div id="${TEXT_TO_TYPE_DOM_ELEMENT_ID}" class="text-to-type"></div>`;
  }

  protected _postInsertHtml(): void {
    this.textToTypeDomElement = document.getElementById(TEXT_TO_TYPE_DOM_ELEMENT_ID);
    this.setNextTextToType();
    document.body.addEventListener('keydown', this.handleKeyDownEvent.bind(this));
  }

  private handleKeyDownEvent(event) {
    const char = event.key;
    const expectedChar = this.currentCharToTypeDomElement.dataset.key;
    if (!CHARS_To_TYPE.test(char)) return;
    if (expectedChar !== char) {
      this.nextCurrentCharToTypeCssClass = 'NOK';
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
      this.setNextTextToType();
    }
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

  private setNextTextToType(): void {
    this.textToTypeIndex = (this.textToTypeIndex + 1) % englishQuotes.length;
    const textToTypeCharArray = englishQuotes[this.textToTypeIndex].split('');
    this.textToTypeDomElement.innerHTML = `${textToTypeCharArray.map(this.charToSpan).join('')}`;
    this.currentCharToTypeDomElement = this.textToTypeDomElement.querySelector('span');
    this.currentCharToTypeDomElement.classList.add('cursor');
    this.textToTypeDomElement.classList.add('blink');
    this.blinkInterval = setInterval(this.toggleBlinkCssClass.bind(this), 350);
  }

  private charToSpan(c: string) {
    if (c === ' ') return `<span data-key=" " class="whitespace">␣</span><wbr>`;
    return `<span data-key="${c}">${c}</span>`;
  }
}

