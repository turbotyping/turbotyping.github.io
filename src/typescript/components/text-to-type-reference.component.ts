import { APP_SETTINGS_CHANGE_EVENT, END_TYPING_EVENT } from '../constants/event.constant';
import { TextToTypeLanguage } from '../models/text-to-type-category.enum';
import { BaseInlineHtmlComponent } from './base/base-inline-component';
import englishQuotes from '../data/quotes.english';
import frenchQuotes from '../data/quotes.french';

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
    switch (appStorage.textToTypeLanguage) {
      case TextToTypeLanguage.ENGLISH: {
        const englishPhrase = englishQuotes[appStorage.textToTypeIndex];
        this.referenceAnchor = `<a href="${englishPhrase.reference}" target="_blank">— ${englishPhrase.author}</a>`;
        break;
      }
      case TextToTypeLanguage.FRENCH: {
        const frenchPhrase = frenchQuotes[appStorage.textToTypeIndex];
        this.referenceAnchor = `<a href="${frenchPhrase.reference}" target="_blank">— ${frenchPhrase.author}</a>`;
        break;
      }
      default: {
        this.referenceAnchor = `— Reference`;
        break;
      }
    }
    this.reference.innerHTML = this.referenceAnchor;
  }
}
