import './button.scss';
import { BaseHtmlComponent } from '../base-component';

export enum ButtonStyle {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

export class ButtonHtmlComponentInput {
  label: string;
  style?: ButtonStyle;
  type?: string;
}

export class ButtonHtmlComponent extends BaseHtmlComponent {
  private containerId: string;
  private buttonId: string;
  private callbacks: (() => void)[] = [];

  constructor(private label: string, private style: ButtonStyle = ButtonStyle.PRIMARY, private type: string = 'button') {
    super();
  }

  preInsertHtml(): void {
    this.containerId = this.generateId();
    this.buttonId = this.generateId();
  }

  toHtml() {
    return /* html */ `
      <span id="${this.containerId}" class="button-container">
        <button id="${this.buttonId}" class="${this.style}" type="${this.type}">${this.label}</button>
      </span>
    `;
  }

  postInsertHtml(): void {
    document.getElementById(this.buttonId).addEventListener('click', this.handleClickEvent.bind(this));
  }

  onClick(callback: () => void) {
    this.callbacks.push(callback);
  }

  private handleClickEvent() {
    this.callbacks.forEach((callback) => callback());
  }
}
