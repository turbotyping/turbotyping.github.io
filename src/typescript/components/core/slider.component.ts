import { BaseBlockUserInputHtmlComponent } from '../base/base-block-user-input-component';

export class SliderHtmlComponent extends BaseBlockUserInputHtmlComponent<number> {
  private sliderId: string;
  private sliderDomElement: HTMLElement;

  constructor(private min: number, private max: number, private value: number) {
    super();
  }

  __preInsertHtml(): void {
    this.sliderId = this.getRandomId();
  }

  __toHtml() {
    return /* html */ `
      <div class="slider-container">
        <input type="range" min="${this.min}" max="${this.max}" value="${this.value}" class="slider" id="${this.sliderId}">
      </div>
    `;
  }

  __postInsertHtml(): void {
    this.sliderDomElement = document.getElementById(this.sliderId);
    this.sliderDomElement.onchange = this.update.bind(this);
  }

  private update(event) {
    this.executeCallbacks(event.target.value);
  }
}
