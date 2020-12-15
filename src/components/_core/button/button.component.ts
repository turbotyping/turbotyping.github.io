import './button.scss';
import { BaseStatefulHtmlComponent } from '../base-stateful-component';

export enum ButtonStyle {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

export class ButtonHtmlComponentInput {
  label: string;
  style?: ButtonStyle;
}

export class ButtonHtmlComponent extends BaseStatefulHtmlComponent<ButtonHtmlComponentInput, void> {
  private containerId: string;
  private buttonId: string;
  private input: ButtonHtmlComponentInput;

  constructor(label: string, style?: ButtonStyle) {
    super();
    this.input = {
      label,
      style: style ? style : ButtonStyle.PRIMARY,
    };
  }

  preInsertHtml(): void {
    this.containerId = this.generateId();
    this.buttonId = this.generateId();
  }

  toHtml() {
    return /* html */ `
      <span id="${this.containerId}" class="button-container">
        <button id="${this.buttonId}" class="${this.input.style}">${this.input.label}</button>
      </span>
    `;
  }

  postInsertHtml(): void {
    document.getElementById(this.buttonId).addEventListener('click', this.handleButtonClickEvent.bind(this));
  }

  getContainerQuerySelector(): string {
    return this.containerId;
  }

  update(input: ButtonHtmlComponentInput): void {
    this.input = { ...this.input, ...input };
    this.reRender();
  }

  private handleButtonClickEvent() {
    this.executeCallbacksOnClick();
  }
}
