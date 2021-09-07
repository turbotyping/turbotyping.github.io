import './icon.scss';
import { BaseHtmlComponent } from '../base-component';

export class IconHtmlComponent extends BaseHtmlComponent {
  private button: HTMLElement;
  private buttonId: string;
  private callbacks: (() => void)[] = [];

  constructor(private icon: string, private title: string, private rotate: string = '0deg') {
    super();
  }

  preInsertHtml(): void {
    this.buttonId = this.generateId();
  }

  toHtml() {
    return /* html */ `
      <button class="button-icon" id="${this.buttonId}" title="${this.title}">
        <span class="iconify" data-icon="${this.icon}" data-rotate="${this.rotate}"></span>
      </button>
    `;
  }

  postInsertHtml(): void {
    this.button = document.getElementById(this.buttonId);
    this.button.addEventListener('click', this.handleClickEvent.bind(this));
  }

  onClick(callback: () => void) {
    this.callbacks.push(callback);
  }

  show() {
    this.button.classList.remove('hide');
  }

  hide() {
    this.button.classList.add('hide');
  }

  focus() {
    this.button.focus();
  }

  private handleClickEvent(event) {
    this.callbacks.forEach((callback) => callback());
  }
}
