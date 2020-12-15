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
  private arrowDownId: string;
  private arrowDown: HTMLElement;
  private arrowUpId: string;
  private arrowUp: HTMLElement;
  private selectHeaderId: string;
  private selectHeader: HTMLElement;
  private selectHeaderLabelText: string;
  private selectHeaderLabelId: string;
  private selectHeaderLabel: HTMLElement;
  private selectOptionsId: string;
  private selectOptions: HTMLElement;
  private selectContainerId: string;
  private selectContainer: HTMLElement;
  private open: boolean;
  private callbacks: ((value: T) => void)[] = [];

  constructor(private input: SelectHtmlComponentInput<T>) {
    super();
  }

  preInsertHtml(): void {
    this.open = false;
    this.arrowUpId = this.generateId();
    this.arrowDownId = this.generateId();
    this.selectHeaderId = this.generateId();
    this.selectOptionsId = this.generateId();
    this.selectContainerId = this.generateId();
    this.selectHeaderLabelId = this.generateId();
    this.selectHeaderLabelText = this.input.options.find((o) => o.value === this.input.selectedOptionValue)?.label || 'Select option';
  }

  toHtml() {
    return /* html */ `
      <div id="${this.selectContainerId}" class="select-container">
        <div id="${this.selectHeaderId}" class="select-header">
          <span id="${this.selectHeaderLabelId}"></span>
          <span id="${this.arrowDownId}" class="iconify" data-icon="eva:arrow-ios-downward-outline" data-inline="false"></span>
          <span id="${this.arrowUpId}" class="iconify" data-icon="eva:arrow-ios-upward-outline" data-inline="false"></span>
        </div>
        <div id="${this.selectOptionsId}" class="select-options"></div>
      </div>
    `;
  }

  postInsertHtml(): void {
    this.selectContainer = document.getElementById(this.selectContainerId);
    this.arrowDown = document.getElementById(this.arrowDownId);
    this.arrowUp = document.getElementById(this.arrowUpId);
    this.selectHeader = document.getElementById(this.selectHeaderId);
    this.selectOptions = document.getElementById(this.selectOptionsId);
    this.selectHeaderLabel = document.getElementById(this.selectHeaderLabelId);
    this.updateInnerHTML();
    this.selectHeader.addEventListener('click', this.handleSelectHeaderClickEvent.bind(this));
    this.selectOptions.addEventListener('click', this.handleSelectOptionsClickEvent.bind(this));
    document.addEventListener('click', this.handleDocumentClickEvent.bind(this));
  }

  reset(input: SelectHtmlComponentInput<T>): void {
    this.input = input;
    this.selectHeaderLabelText = this.input.options.find((o) => o.value === this.input.selectedOptionValue)?.label || 'Select option';
    this.updateInnerHTML();
  }

  onUpdate(callback: (value: T) => void) {
    this.callbacks.push(callback);
  }

  private updateInnerHTML(): void {
    this.selectHeaderLabel.innerText = this.selectHeaderLabelText;
    this.arrowDown.classList.add('hide');
    this.arrowUp.classList.add('hide');
    this.selectContainer.classList.remove('open');
    if (this.open) {
      this.selectContainer.classList.add('open');
      this.arrowUp.classList.remove('hide');
      this.selectOptions.classList.remove('hide');
    } else {
      this.arrowDown.classList.remove('hide');
      this.selectOptions.classList.add('hide');
    }
    this.selectOptions.innerHTML = this.input.options.map((o) => `<span class="select-option">${o.label}</span>`).join('');
  }

  private handleDocumentClickEvent(event) {
    if (!this.selectContainer.contains(event.target)) {
      this.open = false;
      this.updateInnerHTML();
    }
  }

  private handleSelectHeaderClickEvent() {
    this.toggleOpen();
    this.updateInnerHTML();
  }

  private handleSelectOptionsClickEvent(event) {
    this.stopPropagation(event);
    const selectedOption = event.target.closest('.select-option');
    this.selectHeaderLabelText = selectedOption.innerText;
    this.toggleOpen();
    this.updateInnerHTML();
    const value = this.input.options.find((o) => o.label === this.selectHeaderLabelText)?.value || null;
    this.callbacks.forEach((callback) => callback(value));
  }

  private toggleOpen() {
    this.open = !this.open;
  }
}
