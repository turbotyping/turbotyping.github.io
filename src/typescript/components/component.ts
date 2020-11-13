export interface HtmlComponent {

  toHtml(): string;
  
  preInsertHtml(): void;

  insertHtml(parentElement: HTMLElement, insertPosition: InsertPosition): void;

  postInsertHtml(): void;

}

export abstract class BaseHtmlComponent implements HtmlComponent {

  constructor() {
    this.preInsertHtml = this.preInsertHtml.bind(this);
    this.toHtml = this.toHtml.bind(this);
    this.insertHtml = this.insertHtml.bind(this);
    this.postInsertHtml = this.postInsertHtml.bind(this);
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

  protected abstract _postInsertHtml(): void 

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

  getClassName(): string {
    return this.constructor["name"];
  }

}

export abstract class BaseStaticHtmlComponent extends BaseHtmlComponent {
  
  _postInsertHtml(): void {
    // nothing to do!
  }
}
