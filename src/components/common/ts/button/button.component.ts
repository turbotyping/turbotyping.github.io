import { BaseStatefulHtmlComponent } from '../base/base-stateful-component';

export enum ButtonStyle {
  PRIMARY,
  PRIMARY_OUTLINE,
  SECONDARY,
  SECONDARY_OUTLINE,
  SUCCESS,
  SUCCESS_OUTLINE,
  DANGER,
  DANGER_OUTLINE,
  WARNING,
  WARNING_OUTLINE,
  INFO,
  INFO_OUTLINE,
}

export class ButtonHtmlComponentInput {
  label: string;
  style?: ButtonStyle;
  disabled?: boolean;
}

export class ButtonHtmlComponent extends BaseStatefulHtmlComponent<ButtonHtmlComponentInput, void> {
  private containerId: string;
  private buttonId: string;
  private input: ButtonHtmlComponentInput;

  constructor(label: string, style?: ButtonStyle, disabled?: boolean) {
    super();
    this.input = {
      label,
      style: style ? style : ButtonStyle.PRIMARY,
      disabled: disabled ? disabled : false,
    };
  }

  preInsertHtml(): void {
    this.containerId = this.generateId();
    this.buttonId = this.generateId();
  }

  toHtml() {
    return /* html */ `
      <span id="${this.containerId}" class="button-container">
        <button id="${this.buttonId}">${this.input.label}</button>
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
