import { APP_SETTINGS_CHANGE_EVENT, END_TYPING_EVENT } from '../constants/event.constant';
import { AppStorage } from '../models/app-storage.model';
import { BaseInlineHtmlComponent } from './base/base-inline-component';

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
    const textToTypeArray = AppStorage.getTextToTypeArray(appStorage);
    const textToType = textToTypeArray[appStorage.textToTypeIndex];
    this.referenceAnchor = `<a href="${textToType.reference}" target="_blank">— ${textToType.author}</a>`;
    this.reference.innerHTML = this.referenceAnchor;
  }
}
