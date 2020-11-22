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
