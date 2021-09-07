import './select.scss';
import { BaseHtmlComponent } from '../base-component';

export class SelectOption<T> {
  label: string;
  value: T;
}

export class SelectHtmlComponentInput<T> {
  options: SelectOption<T>[];
  selectedOptionValue: T;
}

export class SelectHtmlComponent<T> extends BaseHtmlComponent {
  private select: HTMLElement;
  private selectId: string;
  private callbacks: ((value: T) => void)[] = [];

  constructor(private input: SelectHtmlComponentInput<T>) {
    super();
  }

  preInsertHtml(): void {
    this.selectId = this.generateId();
  }

  toHtml() {
    return /* html */ `
      <select id="${this.selectId}">
        ${this.input.options.map((o) => `<option value="${o.value}">${o.label}</option>`).join('')}
      </select>
    `;
  }

  postInsertHtml(): void {
    this.select = document.getElementById(this.selectId);
    this.select.addEventListener('change', this.handleSelectChangeEvent.bind(this));
  }

  private handleSelectChangeEvent(event) {
    this.callbacks.forEach((callback) => callback(event.target.value));
  }

  reset(input: SelectHtmlComponentInput<T>): void {
    this.input = input;
    this.updateInnerHTML();
  }

  onUpdate(callback: (value: T) => void) {
    this.callbacks.push(callback);
  }

  show() {
    if (this.input.options.length == 0) {
      this.hide();
    } else {
      this.select.classList.remove('hide');
    }
  }

  hide() {
    this.select.classList.add('hide');
  }

  focus() {
    this.select.focus();
  }

  blur() {
    this.select.blur();
  }

  private updateInnerHTML(): void {
    this.select.innerHTML = this.input.options
      .map((o) => `<option value="${o.value}" ${this.input.selectedOptionValue == o.value ? 'selected' : ''}>${o.label}</option>`)
      .join('');
  }
}
