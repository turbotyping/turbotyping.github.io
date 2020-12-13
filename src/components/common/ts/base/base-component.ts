import { AppState } from './app-state.model';
import { IHtmlComponent } from './base-component.interface';

export const APP_STORAGE_LOCAL_STORAGE_KEY = 'app-state-local-storage-key-v1.0';

export abstract class BaseHtmlComponent implements IHtmlComponent {
  private static appState: any;

  abstract preInsertHtml(): void;
  abstract toHtml(): string;
  abstract postInsertHtml(): void;
  abstract getContainerQuerySelector(): string;

  insertHtml(parentElement: HTMLElement, insertPosition: InsertPosition): void {
    parentElement.insertAdjacentHTML(insertPosition, this.toHtml());
  }

  reRender(): void {
    this.getContainer().innerHTML = this.toHtml();
  }

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

  getAppState(): AppState {
    if (!BaseHtmlComponent.appState) {
      BaseHtmlComponent.appState = JSON.parse(localStorage.getItem(APP_STORAGE_LOCAL_STORAGE_KEY)) || new AppState();
    }
    return BaseHtmlComponent.appState;
  }

  saveAppState(newAppState: AppState): void {
    BaseHtmlComponent.appState = newAppState;
    return localStorage.setItem(APP_STORAGE_LOCAL_STORAGE_KEY, JSON.stringify(newAppState));
  }

  show(): void {
    this.getContainer()?.classList.remove('hide');
  }

  hide(): void {
    this.getContainer()?.classList.add('hide');
  }

  toggle(): void {
    this.getContainer()?.classList.toggle('hide');
  }

  private getContainer(): HTMLElement {
    return document.querySelector(this.getContainerQuerySelector());
  }
}
