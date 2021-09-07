import './switch.scss';
import { BaseHtmlComponent } from '../base-component';

export class LabeledSwitchHtmlComponent extends BaseHtmlComponent {
  private containerId: string;
  private container: HTMLElement;
  private callbacks: ((value: boolean) => void)[] = [];

  constructor(private label: string, private value: boolean) {
    super();
  }

  preInsertHtml(): void {
    this.containerId = this.generateId();
  }

  toHtml() {
    return /* html */ `
      <span id="${this.containerId}" class="labeled-switch">${this.label}</span>
    `;
  }

  postInsertHtml(): void {
    this.container = document.getElementById(this.containerId);
    this.update();
    this.container.addEventListener('click', this.handleClickEvent.bind(this));
  }

  reset(input: boolean): void {
    this.value = input;
  }

  onUpdate(callback: (value: boolean) => void) {
    this.callbacks.push(callback);
  }

  private update() {
    if (this.value) {
      this.container.classList.add('on');
    } else {
      this.container.classList.remove('on');
    }
  }

  private handleClickEvent() {
    this.value = !this.value;
    this.update();
    this.callbacks.forEach((callback) => callback(this.value));
  }
}
