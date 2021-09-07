import './add-custom-text-to-type.scss';
import { ButtonHtmlComponent, ButtonStyle } from '../_core/button/button.component';
import { IAppStateClient } from '../../state/app-state.client.interface';
import { TextAreaHtmlComponent } from '../_core/textarea/textarea.component';
import {
  END_UPDATING_CUSTOM_TEXT_TO_TYPE_EVENT,
  CUSTOM_TEXTS_UPDATE_EVENT,
  START_UPDATING_CUSTOM_TEXT_TO_TYPE_EVENT,
  APP_SETTINGS_CHANGE_EVENT,
} from '../../constants/constant';
import { AppState } from '../../state/app-state.model';
import { TableAction, TableColumn, TableHtmlComponent } from '../_core/table/table.component';
import { TextToTypeCategory } from '../../state/text-to-type-category.enum';
import { TextToTypeSubCategory } from '../../state/text-to-type-sub-category.enum';
import { BaseSidePanelHtmlComponent } from '../_core/side-panel/side-panel.component';
import { IconHtmlComponent } from '../_core/icon/icon.component';

class DisplayedCustomTextToAdd {
  text: string;
}

export class AddCustomTextToTypeSidePanelHtmlComponent extends BaseSidePanelHtmlComponent {
  private saveButton: ButtonHtmlComponent;
  private cancelButton: ButtonHtmlComponent;
  private customTextToAddTextArea: TextAreaHtmlComponent;
  private addIcon: IconHtmlComponent;
  private appState: AppState;
  private displayedCustomTextToAddTable: TableHtmlComponent<DisplayedCustomTextToAdd>;
  private customTextsUpdated: boolean = false;

  constructor(private appStateClient: IAppStateClient) {
    super();
    this.saveButton = new ButtonHtmlComponent('Save');
    this.cancelButton = new ButtonHtmlComponent('Cancel', ButtonStyle.SECONDARY);
    this.customTextToAddTextArea = new TextAreaHtmlComponent('', '100%', '20rem');
    this.appState = this.appStateClient.getAppState();
    this.displayedCustomTextToAddTable = new TableHtmlComponent<DisplayedCustomTextToAdd>('No custom text has been added yet!');
    this.addIcon = new IconHtmlComponent('ion:add-outline', 'Add');
  }

  preInsertHtml(): void {
    super.preInsertHtml();
    this.saveButton.preInsertHtml();
    this.cancelButton.preInsertHtml();
    this.customTextToAddTextArea.preInsertHtml();
    this.displayedCustomTextToAddTable.preInsertHtml();
    this.addIcon.preInsertHtml();
  }

  getSidePanelCssClass(): string {
    return 'add-custom-text-to-type-side-panel';
  }

  getTitle(): string {
    return 'Custom text to type';
  }

  getBody(): string {
    return /* html */ `
      <div class="text-to-add-textarea-header">
        <span class="label">Text to add</span>
        ${this.addIcon.toHtml()}
      </div>
      ${this.customTextToAddTextArea.toHtml()}
      <div class="added-custom-texts-table">
        ${this.displayedCustomTextToAddTable.toHtml()}
      </div>
      <div class="add-custom-text-to-type-buttons">
        ${this.cancelButton.toHtml()}
        ${this.saveButton.toHtml()}
      </div>
    `;
  }

  postInsertHtml(): void {
    super.postInsertHtml();
    this.addIcon.postInsertHtml();
    this.saveButton.postInsertHtml();
    this.cancelButton.postInsertHtml();
    this.customTextToAddTextArea.postInsertHtml();
    this.displayedCustomTextToAddTable.postInsertHtml();
    this.appState = this.appStateClient.getAppState();
    this.displayedCustomTextToAddTable.addActionListener(TableAction.DELETE_ROW, this.handleDeleteCustomTextEvent.bind(this));
    this.updateInnerHTML();
    this.saveButton.onClick(this.handleSaveButtonClickEvent.bind(this));
    this.cancelButton.onClick(this.handleCancelButtonClickEvent.bind(this));
    this.addIcon.onClick(this.handleAddIconClickEvent.bind(this));
    this.customTextToAddTextArea.onValidate(this.validateCustomTextToAddTextAreaOnChange.bind(this));
  }

  private handleDeleteCustomTextEvent(row: DisplayedCustomTextToAdd) {
    this.appState.customTextsToType = (this.appState.customTextsToType || []).filter((text) => text.text !== row.text);
    this.appState.textToTypeIndex = 0;
    if (this.appState.customTextsToType.length === 0) {
      this.appState.textToTypeCategory = TextToTypeCategory.QUOTES;
      this.appState.textToTypeSubCategory = TextToTypeSubCategory.ENGLISH;
    }
    this.customTextsUpdated = true;
    this.updateInnerHTML();
  }

  private validateCustomTextToAddTextAreaOnChange(value: string) {
    if (!value) {
      throw new Error('Empty values are not allowed');
    }
  }

  private updateInnerHTML() {
    this.displayedCustomTextToAddTable.reset(this.getCustomTextToAddColumns(), this.getCustomTextToAddRows());
  }

  private handleAddIconClickEvent() {
    if (this.customTextToAddTextArea.isNotValid()) {
      this.customTextToAddTextArea.dispatchChangeEvent();
      return;
    }
    if (!this.appState.customTextsToType) this.appState.customTextsToType = [];
    this.appState.customTextsToType.unshift({
      text: this.customTextToAddTextArea.getValue(),
      author: '',
    });
    this.customTextToAddTextArea.reset();
    this.appState.textToTypeCategory = TextToTypeCategory.CUSTOM_TEXT;
    this.appState.textToTypeIndex = 0;
    this.customTextsUpdated = true;
    this.updateInnerHTML();
  }

  open(): void {
    super.open();
    this.customTextsUpdated = false;
    this.appState = this.appStateClient.getAppState();
    this.customTextToAddTextArea.focus();
    this.dispatchCustomEvent(START_UPDATING_CUSTOM_TEXT_TO_TYPE_EVENT);
  }

  close(): void {
    super.close();
    if (this.customTextsUpdated) this.dispatchCustomEvent(CUSTOM_TEXTS_UPDATE_EVENT);
    this.dispatchCustomEvent(END_UPDATING_CUSTOM_TEXT_TO_TYPE_EVENT);
  }

  private handleSaveButtonClickEvent() {
    if (this.customTextToAddTextArea.isEmpty() && this.customTextsUpdated) {
      this.appStateClient.saveAppState(this.appState);
      this.dispatchCustomEvent(APP_SETTINGS_CHANGE_EVENT);
      this.close();
      return;
    }
    if (this.customTextToAddTextArea.isNotValid()) {
      this.customTextToAddTextArea.dispatchChangeEvent();
      return;
    }
    if (!this.appState.customTextsToType) this.appState.customTextsToType = [];
    this.appState.customTextsToType.unshift({
      text: this.customTextToAddTextArea.getValue(),
      author: '',
    });
    this.customTextToAddTextArea.reset();
    this.appState.textToTypeCategory = TextToTypeCategory.CUSTOM_TEXT;
    this.appState.textToTypeIndex = 0;
    this.updateInnerHTML();
    this.appStateClient.saveAppState(this.appState);
    this.dispatchCustomEvent(APP_SETTINGS_CHANGE_EVENT);
    this.close();
  }

  private handleCancelButtonClickEvent() {
    this.close();
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
        label: 'Custom Text',
        fieldName: 'text',
      },
    ];
  }
}
