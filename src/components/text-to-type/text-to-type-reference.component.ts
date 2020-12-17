import { APP_SETTINGS_CHANGE_EVENT, END_TYPING_EVENT } from '../../constants/constant';
import { BaseHtmlComponent } from '../_core/base-component';
import { IAppStateClient } from '../../state/app-state.client.interface';

export class TextToTypeReferenceHtmlComponent extends BaseHtmlComponent {
  private referenceAnchor: string;
  private referenceId: string;
  private reference: HTMLElement;

  constructor(private appStateClient: IAppStateClient) {
    super();
  }

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

  private updateInnerHTML() {
    const appState = this.appStateClient.getAppState();
    const textToTypeArray = this.appStateClient.getTextToTypeArray();
    const textToType = textToTypeArray[appState.textToTypeIndex];
    this.referenceAnchor = `<a href="${textToType.reference}" target="_blank">— ${textToType.author}</a>`;
    this.reference.innerHTML = this.referenceAnchor;
  }
}
