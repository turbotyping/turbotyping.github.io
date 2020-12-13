import './input.scss';
import { BaseStatefulHtmlComponent } from '../base/base-stateful-component';

export class InputHtmlComponent extends BaseStatefulHtmlComponent<string, string> {
  private inputId: string;
  private input: HTMLInputElement;
  private containerId: string;
  private container: HTMLElement;
  private errorMessageId: string;
  private errorMessage: HTMLElement;

  constructor(private value: string) {
    super();
  }

  preInsertHtml(): void {
    this.inputId = this.generateId();
    this.containerId = this.generateId();
    this.errorMessageId = this.generateId();
  }

  toHtml() {
    return /* html */ `
      <span id="${this.containerId}" class="input-container">
        <input id="${this.inputId}" class="input" type="text" value="${this.value}"/>
        <span id="${this.errorMessageId}" class="input-error-message"></span>
      </span>
    `;
  }

  postInsertHtml(): void {
    this.input = <HTMLInputElement>document.getElementById(this.inputId);
    this.container = document.getElementById(this.containerId);
    this.errorMessage = document.getElementById(this.errorMessageId);
    this.input.addEventListener('change', this.onInputChange.bind(this));
  }

  getContainerQuerySelector(): string {
    return this.containerId;
  }

  update(input: string): void {
    this.input.value = input;
  }

  blur() {
    this.input.blur();
  }

  focus() {
    this.input.focus();
  }

  onInputChange() {
    try {
      this.executeValidators(this.input.value);
      this.container.classList.remove('error');
    } catch (error) {
      this.container.classList.add('error');
      this.errorMessage.innerHTML = error.message;
      return;
    }
    this.executeCallbacksOnUpdate(this.input.value);
  }
}
