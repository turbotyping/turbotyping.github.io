import { APP_STORAGE_LOCAL_STORAGE_KEY } from '../constants/constant';
import { AppStorage } from '../models/app-storage.model';

export interface HtmlComponent {
  toHtml(): string;

  preInsertHtml(): void;

  insertHtml(parentElement: HTMLElement, insertPosition: InsertPosition): void;

  postInsertHtml(): void;

  getClassName(): string;

  show(): void;

  hide(): void;

  toggle(): void;

  stopPropagation(event): void;
}

export abstract class BaseHtmlComponent implements HtmlComponent {
  abstract show(): void;
  abstract hide(): void;
  abstract toggle(): void;

  private static appStorage: AppStorage;

  stopPropagation(event) {
    event.stopPropagation();
  }

  toHtml(): string {
    try {
      return this._toHtml();
    } catch (error) {
      console.error('error while executing ' + this.getClassName() + '.toHtml() method. error: ' + error);
      return '';
    }
  }

  protected abstract _toHtml(): string;

  postInsertHtml(): void {
    try {
      this._postInsertHtml();
    } catch (error) {
      console.error('error while executing ' + this.getClassName() + '.postInsertHtml() method. error: ' + error);
    }
  }

  protected abstract _postInsertHtml(): void;

  preInsertHtml(): void {
    try {
      this._preInsertHtml();
    } catch (error) {
      console.error('error while executing ' + this.getClassName() + '.preInsertHtml() method. error: ' + error);
    }
  }

  protected _preInsertHtml(): void {
    // nothing to do by default!
  }

  insertHtml(parentElement: HTMLElement, insertPosition: InsertPosition): void {
    try {
      parentElement.insertAdjacentHTML(insertPosition, this.toHtml());
    } catch (error) {
      console.error('error while executing ' + this.getClassName() + '.insertHtml() method. error: ' + error);
    }
  }

  dispatchCustomEvent(eventName: string, eventDetail = {}): void {
    try {
      document.dispatchEvent(
        new CustomEvent(eventName, {
          detail: eventDetail,
        })
      );
    } catch (error) {
      console.error('error while executing ' + this.getClassName() + '.dispatchCustomEvent() method. error: ' + error);
    }
  }

  addCustomEventListener(eventName: string, listener: EventListener): void {
    try {
      document.addEventListener(eventName, listener);
    } catch (error) {
      console.error('error while executing ' + this.getClassName() + '.addCustomEventListener() method. error: ' + error);
    }
  }

  delay(fn, ms) {
    try {
      let timer = null;
      return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(fn.bind(this, ...args), ms || 0);
      };
    } catch (error) {
      console.error('error while executing ' + this.getClassName() + '.delay() method. error: ' + error);
      return fn;
    }
  }

  getRandomId(): string {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  getClassName(): string {
    return this.constructor['name'];
  }

  getAppStorage(): AppStorage {
    if (!BaseHtmlComponent.appStorage) {
      BaseHtmlComponent.appStorage = JSON.parse(localStorage.getItem(APP_STORAGE_LOCAL_STORAGE_KEY)) || new AppStorage();
    }
    return BaseHtmlComponent.appStorage;
  }

  saveAppStorage(newAppStorage: AppStorage): void {
    BaseHtmlComponent.appStorage = newAppStorage;
    return localStorage.setItem(APP_STORAGE_LOCAL_STORAGE_KEY, JSON.stringify(newAppStorage));
  }
}

export abstract class BaseBlockHtmlComponent extends BaseHtmlComponent {
  private containerId: string;

  _preInsertHtml(): void {
    this.containerId = this.getRandomId();
    this.__preInsertHtml();
  }

  _toHtml(): string {
    console.log(this.containerId);
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

export abstract class BaseInlineHtmlComponent extends BaseHtmlComponent {
  private containerId: string;

  _preInsertHtml(): void {
    this.containerId = this.getRandomId();
    this.__preInsertHtml();
  }

  _toHtml(): string {
    console.log(this.containerId);
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

export abstract class BaseBlockStaticHtmlComponent extends BaseBlockHtmlComponent {
  __preInsertHtml(): void {
    // nothing to do by default!
  }
  __postInsertHtml(): void {
    // nothing to do by default!
  }
}

export abstract class BaseInlineStaticHtmlComponent extends BaseInlineHtmlComponent {
  __preInsertHtml(): void {
    // nothing to do by default!
  }
  __postInsertHtml(): void {
    // nothing to do by default!
  }
}

export abstract class BaseBlockHtmlContainer extends BaseBlockHtmlComponent {
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
