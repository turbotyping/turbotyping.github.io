import './add-custom-text-to-type-dialog.scss';
import { BaseDialogHtmlComponent, DialogPhase } from '../_core/dialog/base-dialog-component';
import { ButtonHtmlComponent, ButtonStyle } from '../_core/button/button.component';
import { IAppStateClient } from '../_state/app-state.client.interface';
import { TextAreaHtmlComponent } from '../_core/textarea/textarea.component';
import { END_UPDATING_CUSTOM_TEXT_TO_TYPE_EVENT, CUSTOM_TEXTS_UPDATE_EVENT, START_UPDATING_CUSTOM_TEXT_TO_TYPE_EVENT } from '../_constants/constant';
import { AppState } from '../_state/app-state.model';
import { TableAction, TableColumn, TableHtmlComponent } from '../_core/table/table.component';
import { TextToTypeCategory } from '../_state/text-to-type-category.enum';
import { TextToTypeLanguage } from '../_state/text-to-type-language.enum';

class DisplayedCustomTextToAdd {
  text: string;
}

export class AddCustomTextToTypeDialogHtmlComponent extends BaseDialogHtmlComponent {
  private saveButton: ButtonHtmlComponent;
  private cancelButton: ButtonHtmlComponent;
  private customTextToAddTextArea: TextAreaHtmlComponent;
  private addIconId: string;
  private appState: AppState;
  private displayedCustomTextToAddTable: TableHtmlComponent<DisplayedCustomTextToAdd>;
  private customTextsUpdated: boolean = false;

  constructor(private appStateClient: IAppStateClient) {
    super();
    this.saveButton = new ButtonHtmlComponent('Save');
    this.cancelButton = new ButtonHtmlComponent('Cancel', ButtonStyle.SECONDARY);
    this.customTextToAddTextArea = new TextAreaHtmlComponent('');
    this.appState = this.appStateClient.getAppState();
    this.displayedCustomTextToAddTable = new TableHtmlComponent<DisplayedCustomTextToAdd>();
    this.addPhaseListener(DialogPhase.POST_DIALOG_SHOW, this.postShow.bind(this));
    this.addPhaseListener(DialogPhase.POST_DIALOG_HIDE, this.postHide.bind(this));
    this.addIconId = this.generateId();
  }

  preInsertHtml(): void {
    super.preInsertHtml();
    this.saveButton.preInsertHtml();
    this.cancelButton.preInsertHtml();
    this.customTextToAddTextArea.preInsertHtml();
    this.displayedCustomTextToAddTable.preInsertHtml();
  }

  getDialogCssClass(): string {
    return 'add-custom-text-to-type-dialog';
  }

  getDialogTitle(): string {
    return 'Custom text to type';
  }

  getDialogBody(): string {
    return /* html */ `
      <div class="text-to-add-textarea-header">
        <span class="label">Text to add</span>
        <span id="${this.addIconId}" title="Add"><span class="iconify" data-icon="ion:add-outline" data-inline="false"></span></span>
      </div>
      ${this.customTextToAddTextArea.toHtml()}
      <div class="added-custom-texts-table">
        ${this.displayedCustomTextToAddTable.toHtml()}
      </div>
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
    this.customTextToAddTextArea.postInsertHtml();
    this.displayedCustomTextToAddTable.postInsertHtml();
    this.appState = this.appStateClient.getAppState();
    this.displayedCustomTextToAddTable.addActionListener(TableAction.DELETE_ROW, this.handleDeleteCustomTextEvent.bind(this));
    this.updateInnerHTML();
    this.saveButton.onClick(this.handleSaveButtonClickEvent.bind(this));
    this.cancelButton.onClick(this.handleCancelButtonClickEvent.bind(this));
    document.getElementById(this.addIconId).addEventListener('click', this.handleAddIconClickEvent.bind(this));
    this.customTextToAddTextArea.onValidate(this.validateCustomTextToAddTextAreaOnChange.bind(this));
  }

  private handleDeleteCustomTextEvent(row: DisplayedCustomTextToAdd) {
    this.appState.customTextsToType = (this.appState.customTextsToType || []).filter((text) => text.text !== row.text);
    this.appState.textToTypeIndex = 0;
    if (this.appState.customTextsToType.length === 0) {
      this.appState.textToTypeCategory = TextToTypeCategory.QUOTES;
      this.appState.textToTypeLanguage = TextToTypeLanguage.ENGLISH;
    }
    this.customTextsUpdated = true;
    this.updateInnerHTML();
  }

  private validateCustomTextToAddTextAreaOnChange(value: string) {
    if (!value) {
      throw new Error('Empty values are not allowed');
    }
  }

  private validateCustomTextToAddTextArea() {
    if (!this.customTextToAddTextArea.getValue()) {
      const errorMessage = 'Empty values are not allowed';
      this.customTextToAddTextArea.setErrorMessage(errorMessage);
      throw new Error(errorMessage);
    }
  }

  private updateInnerHTML() {
    this.displayedCustomTextToAddTable.reset(this.getCustomTextToAddColumns(), this.getCustomTextToAddRows());
  }

  private handleAddIconClickEvent() {
    try {
      this.validateCustomTextToAddTextArea();
      if (!this.appState.customTextsToType) this.appState.customTextsToType = [];
      this.appState.customTextsToType.unshift({
        text: this.customTextToAddTextArea.getValue(),
        reference: '#',
        author: 'Custom text',
      });
      this.customTextToAddTextArea.reset();
      this.appState.textToTypeCategory = TextToTypeCategory.CUSTOM_TEXT;
      this.appState.textToTypeIndex = 0;
      this.customTextsUpdated = true;
      this.updateInnerHTML();
    } catch (error) {
      console.error(error);
    }
  }

  private postShow(): void {
    this.appState = this.appStateClient.getAppState();
    this.customTextToAddTextArea.focus();
    this.dispatchCustomEvent(START_UPDATING_CUSTOM_TEXT_TO_TYPE_EVENT);
  }

  private postHide(): void {
    super.hide();
    if (this.customTextsUpdated) this.dispatchCustomEvent(CUSTOM_TEXTS_UPDATE_EVENT);
    this.dispatchCustomEvent(END_UPDATING_CUSTOM_TEXT_TO_TYPE_EVENT);
  }

  private handleSaveButtonClickEvent() {
    this.appStateClient.saveAppState(this.appState);
    this.hide();
  }

  private handleCancelButtonClickEvent() {
    this.hide();
  }

  private getCustomTextToAddRows(): DisplayedCustomTextToAdd[] {
    const res = (this.appState.customTextsToType || []).map((text) => {
      return { text: text.text };
    });
    return res;
  }

  private getCustomTextToAddColumns(): TableColumn[] {
    return [
      {
        label: 'Text',
        fieldName: 'text',
      },
    ];
  }
}
