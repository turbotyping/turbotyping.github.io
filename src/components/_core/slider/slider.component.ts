import './slider.scss';
import { BaseHtmlComponent } from '../base-component';

export class SliderHtmlComponentInput {
  min: number;
  max: number;
  value: number;
  title: string;
}

export class SliderHtmlComponent extends BaseHtmlComponent {
  private slider: HTMLElement;
  private sliderId: string;
  private callbacks: ((value: number) => void)[] = [];

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

  onUpdate(callback: (value: number) => void) {
    this.callbacks.push(callback);
  }

  private onSliderChange(event) {
    this.callbacks.forEach((callback) => callback(event.target.value));
  }
}
