import './add-custom-text-to-type-dialog.scss';
import { BaseDialogHtmlComponent } from '../_core/dialog/base-dialog-component';
import { ButtonHtmlComponent, ButtonStyle } from '../_core/button/button.component';
import { IAppStateClient } from '../_state/app-state.client.interface';

export class AddCustomTextToTypeDialogHtmlComponent extends BaseDialogHtmlComponent {
  private saveButton: ButtonHtmlComponent;
  private cancelButton: ButtonHtmlComponent;

  constructor(private appStateClient: IAppStateClient) {
    super();
  }

  preInsertHtml(): void {
    super.preInsertHtml();
    this.saveButton = new ButtonHtmlComponent('Save');
    this.cancelButton = new ButtonHtmlComponent('Cancel', ButtonStyle.SECONDARY);
    this.saveButton.preInsertHtml();
    this.cancelButton.preInsertHtml();
  }

  getDialogCssClass(): string {
    return 'add-custom-text-to-type-dialog';
  }

  getDialogTitle(): string {
    return 'Custom text to type';
  }

  getDialogBody(): string {
    return /* html */ `
      <p>Coming soon...</p>
    `;
  }

  getDialogFooter(): string {
    return /* html */ `
      <div class="add-custom-text-to-type-dialog-footer">
        ${this.cancelButton.toHtml()}
        ${this.saveButton.toHtml()}
      </div>
    `;
  }

  postInsertHtml(): void {
    super.postInsertHtml();
    this.saveButton.postInsertHtml();
    this.cancelButton.postInsertHtml();
    this.saveButton.onClick(this.handleSaveButtonClickEvent.bind(this));
    this.cancelButton.onClick(this.handleCancelButtonClickEvent.bind(this));
  }

  private handleSaveButtonClickEvent() {
    this.hide();
  }

  private handleCancelButtonClickEvent() {
    this.hide();
  }
}
