import { ENABLE_TEXT_TO_TYPE, DISABLE_TEXT_TO_TYPE, ENTER_KEY_CODE, ARROW_UP_KEY_CODE, ARROW_DOWN_KEY_CODE } from '../../../constants/constant';
import { ToastClient } from '../../../services/toast/toast.service';
import { BaseHtmlComponent } from '../base-component';
import './numeric-input.scss';

export class NumericInputHtmlComponent extends BaseHtmlComponent {
  private increaseButtonDomElementId: string;
  private increaseButtonDomElement: HTMLElement;
  private decreaseButtonDomElementId: string;
  private decreaseButtonDomElement: HTMLElement;
  private valueInputDomElementId: string;
  private valueInputDomElement: HTMLInputElement;
  private containerId: string;
  private callbacks: ((value: number) => void)[] = [];

  constructor(private value: number, private toastClient: ToastClient = ToastClient.getInstance()) {
    super();
    this.increaseButtonDomElementId = this.generateId();
    this.decreaseButtonDomElementId = this.generateId();
    this.valueInputDomElementId = this.generateId();
    this.containerId = this.generateId();
  }

  preInsertHtml(): void {}

  toHtml() {
    return /* html */ `
      <div id="${this.containerId}" class="increase-decrease-value-container">
        <span id="${this.decreaseButtonDomElementId}" class="increase-value">-</span>
        <input id="${this.valueInputDomElementId}" class="value" size="${this.getInputSize()}" value="${this.value}" />
        <span id="${this.increaseButtonDomElementId}" class="decrease-value">+</span>
      </div>
    `;
  }

  postInsertHtml() {
    this.increaseButtonDomElement = document.getElementById(this.increaseButtonDomElementId);
    this.decreaseButtonDomElement = document.getElementById(this.decreaseButtonDomElementId);
    this.valueInputDomElement = document.getElementById(this.valueInputDomElementId) as HTMLInputElement;
    this.increaseButtonDomElement.addEventListener('click', () => this.updateValue(1));
    this.decreaseButtonDomElement.addEventListener('click', () => this.updateValue(-1));
    this.valueInputDomElement.addEventListener('change', this.handleValueInputChangeEvent.bind(this));
    this.valueInputDomElement.addEventListener('keydown', this.handleValueInputKeyDownEvent.bind(this));
  }

  private handleValueInputKeyDownEvent(event) {
    if (event.keyCode == ENTER_KEY_CODE) {
      this.valueInputDomElement.blur();
    }
    if (event.keyCode == ARROW_UP_KEY_CODE) {
      this.updateValue(1);
    }
    if (event.keyCode == ARROW_DOWN_KEY_CODE) {
      this.updateValue(-1);
    }
  }

  private handleValueInputChangeEvent() {
    if (!/^[0-9]+$/.test(this.valueInputDomElement.value)) {
      this.toastClient.error('Only numeric values are accepted');
      this.valueInputDomElement.value = `${this.value}`;
      return;
    }
    this.value = parseInt(this.valueInputDomElement.value);
    this.valueInputDomElement.size = this.getInputSize();
    this.callbacks.forEach((callback) => callback(this.value));
  }

  private updateValue(valueChange: number) {
    this.value += valueChange;
    this.valueInputDomElement.value = `${this.value}`;
    this.valueInputDomElement.size = this.getInputSize();
    this.callbacks.forEach((callback) => callback(this.value));
  }

  onUpdate(callback: (value: number) => void) {
    this.callbacks.push(callback);
  }

  private getInputSize(): number {
    return new String(this.value).length;
  }
}
