import { BaseHtmlComponent } from './component';

export abstract class AbstractDialogHtmlComponent extends BaseHtmlComponent {
  private dialogId: string;
  private dialogCloseButtonId: string;
  private dialog: HTMLDialogElement;
  private dialogCloseButton: HTMLElement;

  _preInsertHtml(): void {
    this.dialogId = this.getRandomId();
    this.dialogCloseButtonId = this.getRandomId();
    this.__preInsertHtml();
  }

  abstract __preInsertHtml(): void;

  protected _toHtml(): string {
    return /* html */ `
      <dialog id="${this.dialogId}" class="dialog">
        <div class="dialog-header">
          <span>${this.getDialogTitle()}</span>
          <span id="${this.dialogCloseButtonId}">
            <span class="close iconify" data-icon="eva:close-outline" data-inline="false"></span>
          </span>
        </div>
        <div class="dialog-body">
          ${this.getDialogBody()}
        </div>
      </dialog>
    `;
  }

  abstract getDialogTitle(): string;

  abstract getDialogBody(): string;

  protected _postInsertHtml(): void {
    this.dialog = <HTMLDialogElement>document.getElementById(this.dialogId);
    this.dialogCloseButton = document.getElementById(this.dialogCloseButtonId);
    this.dialogCloseButton.addEventListener('click', this.handleDialogCloseButtonClickEvent.bind(this)), this.__postInsertHtml();
  }

  abstract __postInsertHtml(): void;

  handleDialogCloseButtonClickEvent() {
    console.log('close dialog');
    this.hide();
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
