import { APP_SETTINGS_CHANGE_EVENT, END_TYPING_EVENT } from '../constants/event.constant';
import { TextToTypeCategory } from '../models/text-to-type-category.enum';
import { BaseInlineHtmlComponent } from './base/base-inline-component';
import commonEnglishQuotes from '../data/common-english-quotes';

export class TextToTypeReferenceHtmlComponent extends BaseInlineHtmlComponent {
  private referenceAnchor: string;
  private referenceId: string;
  private reference: HTMLElement;

  __preInsertHtml(): void {
    this.referenceId = this.getRandomId();
  }

  __toHtml(): string {
    return /* html */ `
      <span id="${this.referenceId}"></span>
    `;
  }

  __postInsertHtml(): void {
    this.reference = document.getElementById(this.referenceId);
    this.update();
    this.addCustomEventListener(APP_SETTINGS_CHANGE_EVENT, this.update.bind(this));
    this.addCustomEventListener(END_TYPING_EVENT, this.update.bind(this));
  }

  getContainerClass(): string {
    return 'text-to-type-reference';
  }

  private update() {
    const appStorage = this.getAppStorage();
    switch (appStorage.textToTypeCategory) {
      case TextToTypeCategory.COMMON_ENGLISH_QUOTES: {
        const englishQuote = commonEnglishQuotes[appStorage.textToTypeIndex];
        this.referenceAnchor = `<a href="${englishQuote.reference}" target="_blank">— ${englishQuote.author}</a>`;
        break;
      }
      case TextToTypeCategory.PROPHET_MOHAMED_PBUH_QUOTES: {
        this.referenceAnchor = `<a href="https://medium.com/@kehruba.imran/45-quotes-of-our-beloved-prophet-muhammad-pbuh-about-the-discipline-of-life-97cd017c6f81" target="_blank">— Prophet Mohamed PBUH</a>`;
        break;
      }
      default: {
        this.referenceAnchor = '— Reference';
        break;
      }
    }
    this.reference.innerHTML = this.referenceAnchor;
  }
}
