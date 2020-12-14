import { APP_SETTINGS_CHANGE_EVENT, END_TYPING_EVENT } from '../common/ts/base/constant';
import { AppState } from '../common/ts/base/app-state.model';
import { BaseHtmlComponent } from '../common/ts/base/base-component';

export class TextToTypeReferenceHtmlComponent extends BaseHtmlComponent {
  private referenceAnchor: string;
  private referenceId: string;
  private reference: HTMLElement;

  preInsertHtml(): void {
    this.referenceId = this.generateId();
  }

  toHtml(): string {
    return /* html */ `
      <span class="text-to-type-reference">
      <span id="${this.referenceId}"></span>
      </span>
    `;
  }

  postInsertHtml(): void {
    this.reference = document.getElementById(this.referenceId);
    this.updateInnerHTML();
    this.addCustomEventListener(APP_SETTINGS_CHANGE_EVENT, this.updateInnerHTML.bind(this));
    this.addCustomEventListener(END_TYPING_EVENT, this.updateInnerHTML.bind(this));
  }

  getContainerQuerySelector(): string {
    return '.text-to-type-reference';
  }

  private updateInnerHTML() {
    const appStorage = this.getAppState();
    const textToTypeArray = AppState.getTextToTypeArray(appStorage);
    const textToType = textToTypeArray[appStorage.textToTypeIndex];
    this.referenceAnchor = `<a href="${textToType.reference}" target="_blank">— ${textToType.author}</a>`;
    this.reference.innerHTML = this.referenceAnchor;
  }
}
