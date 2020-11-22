import { BaseInlineHtmlComponent } from './base-inline-component';

export class SwitchHtmlComponent extends BaseInlineHtmlComponent {
  private switchContainerId: string;
  private switchContainerDomElement: HTMLElement;
  private switchOffId: string;
  private switchOffDomElement: HTMLElement;
  private switchOnId: string;
  private switchOnDomElement: HTMLElement;

  constructor(private event: string, private active: boolean) {
    super();
  }

  __preInsertHtml(): void {
    this.switchContainerId = this.getRandomId();
    this.switchOffId = this.getRandomId();
    this.switchOnId = this.getRandomId();
  }

  __toHtml() {
    return /* html */ `
      <span id="${this.switchContainerId}" class="switch-container">
        <span id="${this.switchOffId}"><span class="iconify switch-off" data-icon="ic:outline-check-box-outline-blank" data-inline="false"></span></span>
        <span id="${this.switchOnId}"><span class="iconify switch-on" data-icon="ic:outline-check-box" data-inline="false"></span></span>
      </span>
    `;
  }

  __postInsertHtml(): void {
    this.switchContainerDomElement = document.getElementById(this.switchContainerId);
    this.switchOffDomElement = document.getElementById(this.switchOffId);
    this.switchOnDomElement = document.getElementById(this.switchOnId);
    this.update();
    this.switchContainerDomElement.addEventListener('click', this.handleSwitchClickEvent.bind(this));
  }

  private update() {
    this.switchOnDomElement.classList.remove('hide');
    this.switchOffDomElement.classList.remove('hide');
    if (this.active) {
      this.switchOffDomElement.classList.add('hide');
    } else {
      this.switchOnDomElement.classList.add('hide');
    }
  }

  private handleSwitchClickEvent() {
    this.active = !this.active;
    this.update();
    this.dispatchCustomEvent(this.event, {
      active: this.active,
    });
  }
}
