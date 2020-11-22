import { APP_STORAGE_LOCAL_STORAGE_KEY } from '../../constants/constant';
import { AppStorage } from '../../models/app-storage.model';
import { HtmlComponent } from './component.interface';

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
