import { BaseInlineUserInputHtmlComponent } from '../base/base-inline-user-input-component';

export class InputHtmlComponent extends BaseInlineUserInputHtmlComponent<string> {
  private inputId: string;
  private input: HTMLInputElement;
  private inputContainerId: string;
  private inputContainer: HTMLElement;
  private inputErrorMessageId: string;
  private inputErrorMessage: HTMLElement;

  constructor(private value: string) {
    super();
  }

  __preInsertHtml(): void {
    this.inputId = this.getRandomId();
    this.inputContainerId = this.getRandomId();
    this.inputErrorMessageId = this.getRandomId();
  }

  __toHtml() {
    return /* html */ `
      <span id="${this.inputContainerId}" class="input-container">
        <input id="${this.inputId}" class="input" type="text" value="${this.value}"/>
        <span id="${this.inputErrorMessageId}" class="input-error-message"></span>
      </span>
    `;
  }

  __postInsertHtml(): void {
    this.input = <HTMLInputElement>document.getElementById(this.inputId);
    this.inputContainer = document.getElementById(this.inputContainerId);
    this.inputErrorMessage = document.getElementById(this.inputErrorMessageId);
    this.input.addEventListener('change', this.onInputChange.bind(this));
  }

  setValue(value: string): void {
    this.input.value = value;
  }

  blur() {
    this.input.blur();
  }

  focus() {
    this.input.focus();
  }

  onInputChange() {
    try {
      this.executeValidator(this.input.value);
      this.inputContainer.classList.remove('error');
    } catch (error) {
      this.inputContainer.classList.add('error');
      this.inputErrorMessage.innerHTML = error.message;
      return;
    }
    this.executeCallbacks(this.input.value);
  }
}
