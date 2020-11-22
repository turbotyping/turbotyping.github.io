import { BaseHtmlComponent } from './base-component';

export abstract class BaseDialogHtmlComponent extends BaseHtmlComponent {
  private dialogId: string;
  private dialogContainerId: string;
  private dialogCloseButtonId: string;
  private dialog: HTMLDialogElement;
  private dialogContainer: HTMLElement;
  private dialogCloseButton: HTMLElement;

  _preInsertHtml(): void {
    this.dialogId = this.getRandomId();
    this.dialogContainerId = this.getRandomId();
    this.dialogCloseButtonId = this.getRandomId();
    this.__preInsertHtml();
  }

  abstract __preInsertHtml(): void;

  protected _toHtml(): string {
    return /* html */ `
      <dialog id="${this.dialogId}" class="dialog">
        <div id="${this.dialogContainerId}" class="dialog-container">
          <div class="dialog-header">
            <span>${this.getDialogTitle()}</span>
            <span id="${this.dialogCloseButtonId}">
              <span class="close iconify" data-icon="eva:close-outline" data-inline="false"></span>
            </span>
          </div>
          <div class="dialog-body">
            ${this.getDialogBody()}
          </div>
        </div>
      </dialog>
    `;
  }

  abstract getDialogTitle(): string;

  abstract getDialogBody(): string;

  protected _postInsertHtml(): void {
    this.dialog = <HTMLDialogElement>document.getElementById(this.dialogId);
    this.dialogContainer = document.getElementById(this.dialogContainerId);
    this.dialogCloseButton = document.getElementById(this.dialogCloseButtonId);
    this.dialogCloseButton.addEventListener('click', this.handleDialogCloseButtonClickEvent.bind(this)), this.__postInsertHtml();
    document.addEventListener('click', this.handleDocumentClickEvent.bind(this));
  }

  abstract __postInsertHtml(): void;

  private handleDialogCloseButtonClickEvent() {
    this.hide();
  }

  private handleDocumentClickEvent(event) {
    if (!this.dialogContainer.contains(event.target)) {
      this.hide();
    }
  }

  show(): void {
    this.dialog.showModal();
  }

  hide(): void {
    this.dialog.close();
  }
  toggle(): void {
    // do nothing
  }
}
