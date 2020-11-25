import { SelectOption } from '../../models/select-option.model';
import { BaseInlineUserInputHtmlComponent } from '../base/base-inline-user-input-component';

export class SelectHtmlComponent<T> extends BaseInlineUserInputHtmlComponent<T> {
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
  private open: boolean;

  constructor(private options: SelectOption<T>[], private selectedOptionValue?: T) {
    super();
  }

  __preInsertHtml(): void {
    this.open = false;
    this.selectHeaderLabelText = this.options.find((o) => o.value === this.selectedOptionValue)?.label || 'Select option';
    this.arrowUpId = this.getRandomId();
    this.arrowDownId = this.getRandomId();
    this.selectHeaderId = this.getRandomId();
    this.selectOptionsId = this.getRandomId();
    this.selectContainerId = this.getRandomId();
    this.selectHeaderLabelId = this.getRandomId();
  }

  __toHtml() {
    return /* html */ `
      <div id="${this.selectContainerId}" class="select-container">
        <div id="${this.selectHeaderId}" class="select-header">
          <span id="${this.selectHeaderLabelId}"></span>
          <span id="${this.arrowDownId}" class="iconify" data-icon="eva:arrow-ios-downward-outline" data-inline="false"></span>
          <span id="${this.arrowUpId}" class="iconify" data-icon="eva:arrow-ios-upward-outline" data-inline="false"></span>
        </div>
        <div id="${this.selectOptionsId}" class="select-options">
          ${this.getSelectOptionsHtml()}
        </div>
      </div>
    `;
  }

  __postInsertHtml(): void {
    this.arrowDown = document.getElementById(this.arrowDownId);
    this.arrowUp = document.getElementById(this.arrowUpId);
    this.selectHeader = document.getElementById(this.selectHeaderId);
    this.selectOptions = document.getElementById(this.selectOptionsId);
    this.selectHeaderLabel = document.getElementById(this.selectHeaderLabelId);
    this.update();
    this.selectHeader.addEventListener('click', this.handleSelectHeaderClickEvent.bind(this));
    this.selectOptions.addEventListener('click', this.handleSelectOptionsClickEvent.bind(this));
  }

  getValue(): T {
    return this.options.find((o) => o.label === this.selectHeaderLabelText)?.value || null;
  }

  private getSelectOptionsHtml(): string {
    return this.options.map((o) => `<span class="select-option">${o.label}</span>`).join('');
  }

  private update(): void {
    this.selectHeaderLabel.innerText = this.selectHeaderLabelText;
    this.arrowDown.classList.add('hide');
    this.arrowUp.classList.add('hide');
    if (this.open) {
      this.arrowUp.classList.remove('hide');
      this.selectOptions.classList.remove('hide');
    } else {
      this.arrowDown.classList.remove('hide');
      this.selectOptions.classList.add('hide');
    }
  }

  private handleSelectHeaderClickEvent() {
    this.toggleOpen();
    this.update();
  }

  private handleSelectOptionsClickEvent(event) {
    const selectedOption = event.target.closest('.select-option');
    this.selectHeaderLabelText = selectedOption.innerText;
    this.toggleOpen();
    this.update();
    this.executeCallbacks();
  }

  private toggleOpen() {
    this.open = !this.open;
  }
}
