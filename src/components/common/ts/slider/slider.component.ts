import './slider.scss';
import { BaseStatefulHtmlComponent } from '../base/base-stateful-component';

export class SliderHtmlComponentInput {
  min: number;
  max: number;
  value: number;
  title: string;
}

export class SliderHtmlComponent extends BaseStatefulHtmlComponent<SliderHtmlComponentInput, number> {
  private slider: HTMLElement;
  private sliderId: string;

  constructor(private input: SliderHtmlComponentInput) {
    super();
  }

  preInsertHtml(): void {
    this.sliderId = this.generateId();
  }

  toHtml() {
    return /* html */ `
      <div class="slider-container">
        <input title="${this.input.title}" type="range" min="${this.input.min}" max="${this.input.max}" value="${this.input.value}" class="slider" id="${this.sliderId}">
      </div>
    `;
  }

  postInsertHtml(): void {
    this.slider = document.getElementById(this.sliderId);
    this.slider.onchange = this.onSliderChange.bind(this);
  }

  getContainerQuerySelector(): string {
    return this.sliderId;
  }

  update(input: SliderHtmlComponentInput): void {
    this.input = input;
  }

  private onSliderChange(event) {
    this.executeCallbacksOnUpdate(event.target.value);
  }
}
