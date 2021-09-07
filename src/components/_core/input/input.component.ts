import './input.scss';
import { BaseHtmlComponent } from '../base-component';

export class InputHtmlComponent extends BaseHtmlComponent {
  private inputId: string;
  private input: HTMLInputElement;
  private containerId: string;
  private container: HTMLElement;
  private errorMessageId: string;
  private errorMessage: HTMLElement;
  private validators: ((value: string) => void)[] = [];
  private callbacks: ((value: string) => void)[] = [];

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
    this.input.addEventListener('keyup', this.onInputKeyUp.bind(this));
  }

  reset(value: string): void {
    this.input.value = value;
  }

  blur() {
    this.input.blur();
  }

  focus() {
    this.input.focus();
  }

  onValidate(validator: (value: string) => void) {
    this.validators.push(validator);
  }

  onUpdate(callback: (value: string) => void) {
    this.callbacks.push(callback);
  }

  isNotValid(): boolean {
    return this.container.classList.contains('error') || !this.getValue();
  }

  getValue(): string {
    return this.input.value;
  }

  dispatchChangeEvent(): void {
    this.input.dispatchEvent(new Event('change'));
  }

  private onInputChange() {
    try {
      this.validators.forEach((validator) => validator(this.input.value));
      this.container.classList.remove('error');
    } catch (error) {
      this.container.classList.add('error');
      this.errorMessage.innerHTML = error.message;
      return;
    }
    this.callbacks.forEach((callback) => callback(this.input.value));
  }

  private onInputKeyUp() {
    try {
      this.validators.forEach((validator) => validator(this.input.value));
      this.container.classList.remove('error');
    } catch (error) {
      this.container.classList.add('error');
      this.errorMessage.innerHTML = error.message;
      return;
    }
  }
}
