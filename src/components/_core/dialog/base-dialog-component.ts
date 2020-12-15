import { BaseHtmlComponent } from '../base-component';
import './dialog.scss';

export abstract class BaseDialogHtmlComponent extends BaseHtmlComponent {
  protected dialogId: string;
  protected dialogContainerId: string;
  protected dialogCloseButtonId: string;
  protected dialog: HTMLDialogElement;
  protected dialogContainer: HTMLElement;
  protected dialogCloseButton: HTMLElement;

  abstract getDialogCssClass(): string;
  abstract getDialogTitle(): string;
  abstract getDialogBody(): string;
  abstract getDialogFooter(): string;
  abstract postInsertHtmlInternal(): void;
  abstract preInsertHtmlInternal(): void;

  preInsertHtml(): void {
    this.dialogId = this.generateId();
    this.dialogContainerId = this.generateId();
    this.dialogCloseButtonId = this.generateId();
    this.preInsertHtmlInternal();
  }

  toHtml(): string {
    return /* html */ `
      <dialog id="${this.dialogId}" class="dialog ${this.getDialogCssClass()}">
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
          <div class="dialog-footer">
            ${this.getDialogFooter()}
          </div>
        </div>
      </dialog>
    `;
  }

  postInsertHtml(): void {
    this.dialog = <HTMLDialogElement>document.getElementById(this.dialogId);
    this.dialogContainer = document.getElementById(this.dialogContainerId);
    this.dialogCloseButton = document.getElementById(this.dialogCloseButtonId);
    this.dialogCloseButton.addEventListener('click', this.handleDialogCloseButtonClickEvent.bind(this));
    document.addEventListener('click', this.handleDocumentClickEvent.bind(this));
    this.postInsertHtmlInternal();
  }

  getContainerQuerySelector(): string {
    return this.dialogContainerId;
  }

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
