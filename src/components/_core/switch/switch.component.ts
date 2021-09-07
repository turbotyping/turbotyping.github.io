import './switch.scss';
import { BaseHtmlComponent } from '../base-component';

export class SwitchHtmlComponent extends BaseHtmlComponent {
  private switchOffId: string;
  private switchOffDomElement: HTMLElement;
  private switchOnId: string;
  private switchOnDomElement: HTMLElement;
  private callbacks: ((value: boolean) => void)[] = [];

  constructor(private value: boolean) {
    super();
  }

  preInsertHtml(): void {
    this.switchOffId = this.generateId();
    this.switchOnId = this.generateId();
  }

  toHtml() {
    return /* html */ `
      <span class="switch-container">
        <button id="${this.switchOffId}"><svg class="switch-off" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M17 7H7a5 5 0 0 0-5 5a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5a5 5 0 0 0-5-5M7 15a3 3 0 0 1-3-3a3 3 0 0 1 3-3a3 3 0 0 1 3 3a3 3 0 0 1-3 3z" fill="currentColor"/></svg></button>
        <button id="${this.switchOnId}"><svg class="switch-on" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M17 7H7a5 5 0 0 0-5 5a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5a5 5 0 0 0-5-5m0 8a3 3 0 0 1-3-3a3 3 0 0 1 3-3a3 3 0 0 1 3 3a3 3 0 0 1-3 3z" fill="currentColor"/></svg></button>
      </span>
    `;
  }

  postInsertHtml(): void {
    this.switchOffDomElement = document.getElementById(this.switchOffId);
    this.switchOnDomElement = document.getElementById(this.switchOnId);
    this.updateInnerHTML();
    this.switchOffDomElement.addEventListener('click', this.handleSwitchClickEvent.bind(this));
    this.switchOnDomElement.addEventListener('click', this.handleSwitchClickEvent.bind(this));
  }

  reset(input: boolean): void {
    this.value = input;
    this.updateInnerHTML();
  }

  onUpdate(callback: (value: boolean) => void) {
    this.callbacks.push(callback);
  }

  private updateInnerHTML() {
    this.switchOnDomElement.classList.remove('hide');
    this.switchOffDomElement.classList.remove('hide');
    if (this.value) {
      this.switchOffDomElement.classList.add('hide');
    } else {
      this.switchOnDomElement.classList.add('hide');
    }
  }

  private handleSwitchClickEvent() {
    this.value = !this.value;
    this.updateInnerHTML();
    this.callbacks.forEach((callback) => callback(this.value));
    this.switchOffDomElement.focus();
    this.switchOnDomElement.focus();
  }
}
