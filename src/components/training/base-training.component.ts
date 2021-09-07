import './training.scss';
import { BaseHtmlComponent } from '../_core/base-component';
import { IHtmlComponent } from '../_core/component.interface';
import { TrainingKeysHtmlComponent } from './training-keys.component';

export abstract class BaseTrainingHtmlComponent extends BaseHtmlComponent {
  private components: IHtmlComponent[] = [];
  private containerId: string;
  private container: HTMLElement;
  private arrowRightId: string;
  private arrowRight: HTMLElement;
  private arrowLeftId: string;
  private arrowLeft: HTMLElement;

  preInsertHtml(): void {
    this.containerId = this.generateId();
    this.arrowRightId = this.generateId();
    this.arrowLeftId = this.generateId();
    this.components = this.getComponents();
  }

  toHtml() {
    return /* html */ `
      <span class="training-title">Training lessons</span>
      <div class="training-container2">
        <div id="${this.arrowLeftId}" class="arrow-left"><span class="iconify" data-icon="eva:arrow-ios-back-outline"></span></div>
        <div id="${this.containerId}" class="training-container1">
          ${this.components.map((k) => k.toHtml()).join('')}
        </div>
        <div id="${this.arrowRightId}" class="arrow-right"><span class="iconify" data-icon="eva:arrow-ios-forward-outline"></span></div>
      </div>
    `;
  }

  postInsertHtml(): void {
    this.container = document.getElementById(this.containerId);
    this.arrowLeft = document.getElementById(this.arrowLeftId);
    this.arrowRight = document.getElementById(this.arrowRightId);
    this.components.forEach((c) => c.postInsertHtml());
    this.update();
    this.arrowLeft.addEventListener('click', this.handleArrowLeftClickEvent.bind(this));
    this.arrowRight.addEventListener('click', this.handleArrowRightClickEvent.bind(this));
    this.container.addEventListener('scroll', this.update.bind(this));
  }

  abstract getComponents(): TrainingKeysHtmlComponent[];

  private handleArrowLeftClickEvent() {
    this.container.scrollBy(-300, 0);
    this.update();
  }

  private handleArrowRightClickEvent() {
    this.container.scrollBy(300, 0);
    this.update();
  }

  private update() {
    this.arrowLeft.classList.remove('hide');
    if (this.container.scrollLeft == 0) {
      this.arrowLeft.classList.add('hide');
    }
    this.arrowRight.classList.remove('hide');
    if (this.container.scrollWidth - (this.container.scrollLeft + this.container.getBoundingClientRect().width) < 1) {
      this.arrowRight.classList.add('hide');
    }
  }
}
