import { BaseHtmlComponent } from '../base-component';
import './dialog.scss';

export enum DialogPhase {
  POST_DIALOG_HIDE,
  POST_DIALOG_SHOW,
}

export abstract class BaseDialogHtmlComponent extends BaseHtmlComponent {
  protected dialogBackgroundId: string;
  protected dialogId: string;
  protected dialogContainerId: string;
  protected dialogCloseButtonId: string;
  protected dialog: HTMLElement;
  protected dialogContainer: HTMLElement;
  protected dialogCloseButton: HTMLElement;
  private isVisible: boolean;
  private callbacks: Map<DialogPhase, (() => void)[]> = new Map<DialogPhase, (() => void)[]>();

  abstract getDialogCssClass(): string;
  abstract getDialogTitle(): string;
  abstract getDialogBody(): string;
  abstract getDialogFooter(): string;

  preInsertHtml(): void {
    this.isVisible = false;
    this.dialogBackgroundId = this.generateId();
    this.dialogId = this.generateId();
    this.dialogContainerId = this.generateId();
    this.dialogCloseButtonId = this.generateId();
  }

  toHtml(): string {
    return /* html */ `
      <div id="${this.dialogBackgroundId}" class="hide dialog-background">
        <div id="${this.dialogId}" class="dialog ${this.getDialogCssClass()}">
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
        </div>
      </div>
    `;
  }

  postInsertHtml(): void {
    this.dialog = document.getElementById(this.dialogBackgroundId);
    this.dialogContainer = document.getElementById(this.dialogContainerId);
    this.dialogCloseButton = document.getElementById(this.dialogCloseButtonId);
    this.dialogCloseButton.addEventListener('click', this.handleDialogCloseButtonClickEvent.bind(this));
    document.addEventListener('click', this.handleDocumentClickEvent.bind(this));
  }

  open(): void {
    this.isVisible = true;
    this.dialog.classList.remove('hide');
    (this.callbacks.get(DialogPhase.POST_DIALOG_SHOW) || []).forEach((callback) => callback());
  }

  close(): void {
    if (!this.isVisible) return;
    this.isVisible = false;
    this.dialog.classList.add('hide');
    (this.callbacks.get(DialogPhase.POST_DIALOG_HIDE) || []).forEach((callback) => callback());
  }

  addPhaseListener(phase: DialogPhase, callback: () => void) {
    let callbacks = this.callbacks.get(phase);
    if (!callbacks) callbacks = [];
    callbacks.push(callback);
    this.callbacks.set(phase, callbacks);
  }

  private handleDialogCloseButtonClickEvent() {
    this.close();
  }

  private handleDocumentClickEvent(event) {
    if (!this.dialogContainer.contains(event.target)) {
      this.close();
    }
  }
}
