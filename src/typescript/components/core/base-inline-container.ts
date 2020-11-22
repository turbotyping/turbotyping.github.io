import { BaseInlineHtmlComponent } from './base-inline-component';
import { HtmlComponent } from './component.interface';

export abstract class BaseInlineHtmlContainer extends BaseInlineHtmlComponent {
  private componentsArray: HtmlComponent[];

  __preInsertHtml(): void {
    this.getComponents().forEach((component) => component.preInsertHtml());
  }

  __toHtml(): string {
    return `
      ${this.getContainerBeginTag()}
      ${this.getComponents()
        .map((component) => component.toHtml())
        .join('')}
      ${this.getContainerEndTag()}
    `;
  }

  __postInsertHtml(): void {
    this.getComponents().forEach((component) => component.postInsertHtml());
  }

  protected getComponents(): HtmlComponent[] {
    if (!this.componentsArray) {
      this.componentsArray = this.__getComponents();
    }
    return this.componentsArray;
  }

  protected abstract __getComponents(): HtmlComponent[];

  protected abstract getContainerBeginTag(): string;

  protected abstract getContainerEndTag(): string;
}
