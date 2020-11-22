import { BaseHtmlComponent } from './base-component';

export abstract class BaseBlockHtmlComponent extends BaseHtmlComponent {
  private containerId: string;

  _preInsertHtml(): void {
    this.containerId = this.getRandomId();
    this.__preInsertHtml();
  }

  _toHtml(): string {
    return `<div id="${this.containerId}">${this.__toHtml()}</div>`;
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
