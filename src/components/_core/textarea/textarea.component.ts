import './textarea.scss';
import { BaseHtmlComponent } from '../base-component';

export class TextAreaHtmlComponentInput {
  value: string;
  cssWidth?: string;
  cssHeight?: string;
}

export class TextAreaHtmlComponent extends BaseHtmlComponent {
  private containerId: string;
  private container: HTMLElement;
  private textAreaId: string;
  private textArea: HTMLTextAreaElement;
  private errorMessageId: string;
  private errorMessage: HTMLElement;
  private validators: ((value: string) => void)[] = [];
  private callbacks: ((value: string) => void)[] = [];
  private input: TextAreaHtmlComponentInput;

  constructor(value: string, cssWidth: string = '100%', cssHeight: string = '10rem') {
    super();
    this.input = {
      value,
      cssWidth,
      cssHeight,
    };
  }

  preInsertHtml(): void {
    this.containerId = this.generateId();
    this.textAreaId = this.generateId();
    this.errorMessageId = this.generateId();
  }

  toHtml() {
    return /* html */ `
      <span id="${this.containerId}" class="textarea-container">
        <textarea id="${this.textAreaId}" class="textarea" style="width: ${this.input.cssWidth}; max-width: ${this.input.cssWidth}; height: ${this.input.cssHeight}" >${this.input.value}</textarea>
        <span id="${this.errorMessageId}" class="textarea-error-message"></span>
      </span>
    `;
  }

  postInsertHtml(): void {
    this.textArea = <HTMLTextAreaElement>document.getElementById(this.textAreaId);
    this.container = document.getElementById(this.containerId);
    this.errorMessage = document.getElementById(this.errorMessageId);
    this.textArea.addEventListener('change', this.onTextAreaChange.bind(this));
    this.textArea.addEventListener('keyup', this.onTextAreaKeyUp.bind(this));
  }

  reset(value: string = ''): void {
    this.textArea.value = value;
  }

  blur() {
    this.textArea.blur();
  }

  focus() {
    this.textArea.focus();
  }

  onValidate(validator: (value: string) => void) {
    this.validators.push(validator);
  }

  onUpdate(callback: (value: string) => void) {
    this.callbacks.push(callback);
  }

  getValue(): string {
    return this.textArea.value;
  }

  setErrorMessage(errorMessage: string) {
    this.container.classList.add('error');
    this.errorMessage.innerHTML = errorMessage;
  }

  isNotValid(): boolean {
    return this.container.classList.contains('error') || !this.getValue();
  }

  isEmpty() {
    return !this.getValue();
  }

  dispatchChangeEvent(): void {
    this.textArea.dispatchEvent(new Event('change'));
  }

  private onTextAreaChange() {
    try {
      this.validators.forEach((validator) => validator(this.textArea.value));
      this.container.classList.remove('error');
    } catch (error) {
      this.container.classList.add('error');
      this.errorMessage.innerHTML = error.message;
      return;
    }
    this.callbacks.forEach((callback) => callback(this.textArea.value));
  }

  private onTextAreaKeyUp() {
    try {
      this.validators.forEach((validator) => validator(this.textArea.value));
      this.container.classList.remove('error');
    } catch (error) {
      this.container.classList.add('error');
      this.errorMessage.innerHTML = error.message;
      return;
    }
  }
}
