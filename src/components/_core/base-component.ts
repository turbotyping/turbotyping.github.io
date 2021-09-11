import { IHtmlComponent } from './component.interface';

export abstract class BaseHtmlComponent implements IHtmlComponent {
  abstract preInsertHtml(): void;
  abstract toHtml(): string;
  abstract postInsertHtml(): void;
  private _containerId: string;

  insertHtml(parentElement: HTMLElement, insertPosition: InsertPosition): void {
    this._containerId = this.generateId();
    parentElement.insertAdjacentHTML(insertPosition, `<div id="${this._containerId}">${this.toHtml()}</div>`);
  }

  update(): void {
    const container = document.getElementById(this._containerId);
    container.innerHTML = this.toHtml();
  }

  preDestroy(): void {}

  stopPropagation(event) {
    event.stopPropagation();
  }

  dispatchCustomEvent(eventName: string, eventDetail: any = {}): void {
    document.dispatchEvent(
      new CustomEvent(eventName, {
        detail: eventDetail,
      })
    );
  }

  addCustomEventListener(eventName: string, listener: EventListener): void {
    document.addEventListener(eventName, listener);
  }

  delayCallback(callback: (...args: any[]) => void, ms: number): (...args: any[]) => void {
    let timer = null;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(callback.bind(this, ...args), ms || 0);
    };
  }

  generateId(): string {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  getComponentName(): string {
    return this.constructor['name'];
  }
}
