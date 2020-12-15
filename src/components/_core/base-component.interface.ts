export interface IHtmlComponent {
  toHtml(): string;

  preInsertHtml(): void;

  insertHtml(parentElement: HTMLElement, insertPosition: InsertPosition): void;

  postInsertHtml(): void;

  reRender(): void;

  generateId(): string;

  getContainerQuerySelector(): string;

  show(): void;

  hide(): void;

  toggle(): void;

  delayCallback(callback: (...args: any[]) => void, ms: number): (...args: any[]) => void;

  getComponentName(): string;

  dispatchCustomEvent(eventName: string, eventDetail: any): void;

  addCustomEventListener(eventName: string, listener: EventListener): void;
}
