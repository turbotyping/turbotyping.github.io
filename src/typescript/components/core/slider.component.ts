import { BaseBlockUserInputHtmlComponent } from '../base/base-block-user-input-component';

export class SliderHtmlComponent extends BaseBlockUserInputHtmlComponent<number> {
  private sliderId: string;
  private sliderDomElement: HTMLElement;

  constructor(private min: number, private max: number, private value: number, private title: string) {
    super();
  }

  __preInsertHtml(): void {
    this.sliderId = this.getRandomId();
  }

  __toHtml() {
    return /* html */ `
      <div class="slider-container">
        <input title="${this.title}" type="range" min="${this.min}" max="${this.max}" value="${this.value}" class="slider" id="${this.sliderId}">
      </div>
    `;
  }

  __postInsertHtml(): void {
    this.sliderDomElement = document.getElementById(this.sliderId);
    this.sliderDomElement.onchange = this.update.bind(this);
  }

  setValue(value: number): void {}

  private update(event) {
    this.executeCallbacks(event.target.value);
  }
}
