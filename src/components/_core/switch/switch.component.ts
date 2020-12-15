import './switch.scss';
import { BaseHtmlComponent } from '../base-component';

export class SwitchHtmlComponent extends BaseHtmlComponent {
  private switchContainerId: string;
  private switchContainerDomElement: HTMLElement;
  private switchOffId: string;
  private switchOffDomElement: HTMLElement;
  private switchOnId: string;
  private switchOnDomElement: HTMLElement;
  private callbacks: ((value: boolean) => void)[] = [];

  constructor(private value: boolean) {
    super();
  }

  preInsertHtml(): void {
    this.switchContainerId = this.generateId();
    this.switchOffId = this.generateId();
    this.switchOnId = this.generateId();
  }

  toHtml() {
    return /* html */ `
      <span id="${this.switchContainerId}" class="switch-container">
        <span id="${this.switchOffId}"><span class="iconify switch-off" data-icon="ic:outline-check-box-outline-blank" data-inline="false"></span></span>
        <span id="${this.switchOnId}"><span class="iconify switch-on" data-icon="ic:outline-check-box" data-inline="false"></span></span>
      </span>
    `;
  }

  postInsertHtml(): void {
    this.switchContainerDomElement = document.getElementById(this.switchContainerId);
    this.switchOffDomElement = document.getElementById(this.switchOffId);
    this.switchOnDomElement = document.getElementById(this.switchOnId);
    this.updateInnerHTML();
    this.switchContainerDomElement.addEventListener('click', this.handleSwitchClickEvent.bind(this));
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
  }
}
