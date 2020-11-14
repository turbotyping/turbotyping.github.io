import { BaseHtmlComponent } from "./component";
import englishQuotes from '../data/english-quotes';

const TEXT_TO_TYPE_DOM_ELEMENT_ID = "TextToType"
const CHARS_To_TYPE: RegExp = /^[A-Za-z0-9é"'\(-è_çà\)=:/;.,?<>!~#{\[|@\]}+ ]$/;

export class TextToTypeHtmlComponent extends BaseHtmlComponent {

  private textToTypeDomElement: HTMLElement;
  private currentCharToTypeDomElement: Element;
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
    if (!CHARS_To_TYPE.test(char)) return;
    if (this.currentCharToTypeDomElement.textContent !== char) {
      this.nextCurrentCharToTypeCssClass = 'NOK';
      return;
    }
    clearInterval(this.blinkInterval);
    this.currentCharToTypeDomElement.classList.add(this.nextCurrentCharToTypeCssClass);
    this.currentCharToTypeDomElement.classList.remove('cursor');
    this.currentCharToTypeDomElement = this.currentCharToTypeDomElement.nextElementSibling;
    this.nextCurrentCharToTypeCssClass = 'OK';
    if (this.currentCharToTypeDomElement) {
      this.currentCharToTypeDomElement.classList.add('cursor');
      this.textToTypeDomElement.classList.add('blink');
      this.blinkInterval = setInterval(this.toggleBlinkCssClass.bind(this), 350);
    } else {
      this.setNextTextToType();
    }
  }

  private toggleBlinkCssClass() {
    this.textToTypeDomElement.classList.toggle('blink');
  }

  private setNextTextToType(): void {
    this.textToTypeIndex = (this.textToTypeIndex + 1) % englishQuotes.length;
    const textToTypeCharArray = englishQuotes[this.textToTypeIndex].split('');
    this.textToTypeDomElement.innerHTML = `${textToTypeCharArray.map(c => `<span>${c}</span>`).join('')}`;
    this.currentCharToTypeDomElement = this.textToTypeDomElement.querySelector('span');
    this.currentCharToTypeDomElement.classList.add('cursor');
    this.textToTypeDomElement.classList.add('blink');
    this.blinkInterval = setInterval(this.toggleBlinkCssClass.bind(this), 350);
  }
}

