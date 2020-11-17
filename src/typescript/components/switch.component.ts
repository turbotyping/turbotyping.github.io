import { BaseHtmlComponent } from './component';

export class SwitchHtmlComponent extends BaseHtmlComponent {
  private switchContainerId: string;
  private switchContainerDomElement: HTMLElement;
  private switchOffId: string;
  private switchOffDomElement: HTMLElement;
  private switchOnId: string;
  private switchOnDomElement: HTMLElement;

  constructor(private event: string, private state: SwitchState = SwitchState.OFF) {
    super();
  }

  _preInsertHtml(): void {
    this.switchContainerId = this.getRandomId();
    this.switchOffId = this.getRandomId();
    this.switchOnId = this.getRandomId();
  }

  _toHtml() {
    return /* html */ `
      <span id="${this.switchContainerId}" class="switch-container">
        <span id="${this.switchOffId}"><span class="iconify switch-off" data-icon="mdi:toggle-switch-off" data-inline="false"></span></span>
        <span id="${this.switchOnId}"><span class="iconify switch-on" data-icon="mdi:toggle-switch" data-inline="false"></span></span>
      </span>
    `;
  }

  protected _postInsertHtml(): void {
    this.switchContainerDomElement = document.getElementById(this.switchContainerId);
    this.switchOffDomElement = document.getElementById(this.switchOffId);
    this.switchOnDomElement = document.getElementById(this.switchOnId);
    this.update();
    this.switchContainerDomElement.addEventListener('click', this.handleSwitchClickEvent.bind(this));
  }

  private update() {
    this.switchOnDomElement.classList.remove('hide');
    this.switchOffDomElement.classList.remove('hide');
    if (this.state === SwitchState.OFF) {
      this.switchOnDomElement.classList.add('hide');
    } else {
      this.switchOffDomElement.classList.add('hide');
    }
  }

  private handleSwitchClickEvent() {
    this.state = this.state === SwitchState.OFF ? SwitchState.ON : SwitchState.OFF;
    this.update();
    this.dispatchCustomEvent(this.event, {
      newState: this.state,
    });
  }
}

export enum SwitchState {
  OFF,
  ON,
}
