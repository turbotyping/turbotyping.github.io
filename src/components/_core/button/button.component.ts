import './button.scss';
import { BaseHtmlComponent } from '../base-component';

export enum ButtonStyle {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

export class ButtonHtmlComponentInput {
  label: string;
  style?: ButtonStyle;
}

export class ButtonHtmlComponent extends BaseHtmlComponent {
  private containerId: string;
  private buttonId: string;
  private callbacks: (() => void)[] = [];

  constructor(private label: string, private style: ButtonStyle = ButtonStyle.PRIMARY) {
    super();
  }

  preInsertHtml(): void {
    this.containerId = this.generateId();
    this.buttonId = this.generateId();
  }

  toHtml() {
    return /* html */ `
      <span id="${this.containerId}" class="button-container">
        <button id="${this.buttonId}" class="${this.style}">${this.label}</button>
      </span>
    `;
  }

  postInsertHtml(): void {
    document.getElementById(this.buttonId).addEventListener('click', () => this.callbacks.forEach((callback) => callback()));
  }

  onClick(callback: () => void) {
    this.callbacks.push(callback);
  }
}
