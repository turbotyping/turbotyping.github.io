import { BaseHtmlComponent } from './base-component';

export abstract class BaseInlineHtmlComponent extends BaseHtmlComponent {
  private containerId: string;

  _preInsertHtml(): void {
    this.containerId = this.getRandomId();
    this.__preInsertHtml();
  }

  _toHtml(): string {
    return `<span id="${this.containerId}">${this.__toHtml()}</span>`;
  }

  _postInsertHtml(): void {
    this.__postInsertHtml();
  }

  show(): void {
    document.getElementById(this.containerId).classList.remove('hide');
  }

  hide(): void {
    document.getElementById(this.containerId).classList.add('hide');
  }

  toggle(): void {
    document.getElementById(this.containerId).classList.toggle('hide');
  }

  abstract __preInsertHtml(): void;
  abstract __toHtml(): string;
  abstract __postInsertHtml(): void;
}
