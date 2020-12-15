export interface IHtmlComponent {
  toHtml(): string;

  preInsertHtml(): void;

  insertHtml(parentElement: HTMLElement, insertPosition: InsertPosition): void;

  postInsertHtml(): void;
}
