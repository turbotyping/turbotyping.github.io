import { BaseHtmlComponent } from './base-component';
import { IHtmlComponent } from './base-component.interface';

export abstract class BaseHtmlContainer extends BaseHtmlComponent {
  private componentsArray: IHtmlComponent[];

  abstract getComponents(): IHtmlComponent[];
  abstract getContainerBeginTag(): string;
  abstract getContainerEndTag(): string;

  preInsertHtml(): void {
    this._getComponents().forEach((component) => component.preInsertHtml());
  }

  toHtml(): string {
    return `
      ${this.getContainerBeginTag()}
      ${this._getComponents()
        .map((component) => component.toHtml())
        .join('')}
      ${this.getContainerEndTag()}
    `;
  }

  postInsertHtml(): void {
    this._getComponents().forEach((component) => component.postInsertHtml());
  }

  private _getComponents(): IHtmlComponent[] {
    if (!this.componentsArray) {
      this.componentsArray = this.getComponents();
    }
    return this.componentsArray;
  }
}
