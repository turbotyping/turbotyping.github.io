import './app-settings-dialog.scss';
import { APP_SETTINGS_CHANGE_EVENT, END_UPDATING_APP_SETTINGS_EVENT, START_UPDATING_APP_SETTINGS_EVENT } from '../common/ts/base/constant';
import { BaseDialogHtmlComponent } from '../common/ts/dialog/base-dialog-component';
import { InputHtmlComponent } from '../common/ts/input/input.component';
import { SelectHtmlComponent } from '../common/ts/select/select.component';
import { SwitchHtmlComponent } from '../common/ts/switch/switch.component';
import { TextToTypeCategory, TEXT_TO_TYPE_CATEGORIES } from '../text-to-type/text-to-type-category.enum';
import { getTextToTypeLanguage, TextToTypeLanguage } from '../text-to-type/text-to-type-language.enum';
import { ButtonHtmlComponent, ButtonStyle } from '../common/ts/button/button.component';
import { AppState } from '../common/ts/base/app-state.model';

export class AppSettingsDialogHtmlComponent extends BaseDialogHtmlComponent {
  private stopOnErrorSwitch: SwitchHtmlComponent;
  private enableCapitalLettersSwitch: SwitchHtmlComponent;
  private enablePunctuationCharactersSwitch: SwitchHtmlComponent;
  private enableSoundsSwitch: SwitchHtmlComponent;
  private maxCharactersToType: InputHtmlComponent;
  private textToTypeCategoriesSelect: SelectHtmlComponent<TextToTypeCategory>;
  private textToTypeLanguagesSelect: SelectHtmlComponent<TextToTypeLanguage>;
  private enableCapitalLettersContainer: HTMLElement;
  private enablePunctuationCharactersContainer: HTMLElement;
  private textToTypeLanguagesContainerId: string;
  private enableCapitalLettersContainerId: string;
  private enablePunctuationCharactersContainerId: string;
  private saveButton: ButtonHtmlComponent;
  private cancelButton: ButtonHtmlComponent;
  private appState: AppState;

  preInsertHtmlInternal(): void {
    this.enableCapitalLettersContainerId = this.generateId();
    this.enablePunctuationCharactersContainerId = this.generateId();
    this.textToTypeLanguagesContainerId = this.generateId();
    const appStorage = this.getAppState();
    appStorage.textToTypeCategory = appStorage.textToTypeCategory || TextToTypeCategory.CODE;
    appStorage.textToTypeLanguage = appStorage.textToTypeLanguage || TextToTypeLanguage.JAVA;
    appStorage.stopOnError = appStorage.stopOnError || false;
    appStorage.enableCapitalLetters = appStorage.enableCapitalLetters || true;
    appStorage.enablePunctuationCharacters = appStorage.enablePunctuationCharacters || true;
    appStorage.enableSounds = appStorage.enableSounds || false;
    appStorage.maxCharactersToType = appStorage.maxCharactersToType || 2000;
    this.saveAppState(appStorage);
    this.stopOnErrorSwitch = new SwitchHtmlComponent(appStorage.stopOnError);
    this.enableCapitalLettersSwitch = new SwitchHtmlComponent(appStorage.enableCapitalLetters);
    this.enableSoundsSwitch = new SwitchHtmlComponent(appStorage.enableSounds);
    this.enablePunctuationCharactersSwitch = new SwitchHtmlComponent(appStorage.enablePunctuationCharacters);
    this.maxCharactersToType = new InputHtmlComponent(appStorage.maxCharactersToType.toString());
    this.textToTypeCategoriesSelect = new SelectHtmlComponent<TextToTypeCategory>({
      options: TEXT_TO_TYPE_CATEGORIES,
      selectedOptionValue: appStorage.textToTypeCategory,
    });
    this.textToTypeLanguagesSelect = new SelectHtmlComponent<TextToTypeLanguage>({
      options: getTextToTypeLanguage(appStorage.textToTypeCategory),
      selectedOptionValue: appStorage.textToTypeLanguage,
    });
    this.saveButton = new ButtonHtmlComponent('Save');
    this.cancelButton = new ButtonHtmlComponent('Cancel', ButtonStyle.SECONDARY);
    this.stopOnErrorSwitch.preInsertHtml();
    this.enableCapitalLettersSwitch.preInsertHtml();
    this.enablePunctuationCharactersSwitch.preInsertHtml();
    this.enableSoundsSwitch.preInsertHtml();
    this.maxCharactersToType.preInsertHtml();
    this.textToTypeCategoriesSelect.preInsertHtml();
    this.textToTypeLanguagesSelect.preInsertHtml();
    this.saveButton.preInsertHtml();
    this.cancelButton.preInsertHtml();
  }

  getDialogCssClass(): string {
    return 'app-settings-dialog';
  }

  getDialogTitle(): string {
    return 'Settings';
  }

  getDialogBody(): string {
    return /* html */ `
      <div class="app-setting">
        <span>Text to type category</span>
        <span>${this.textToTypeCategoriesSelect.toHtml()}</span>
      </div>
      <div class="app-setting">
        <span>Text to type language</span>
        <span id="${this.textToTypeLanguagesContainerId}">${this.textToTypeLanguagesSelect.toHtml()}</span>
      </div>
      <div class="app-setting">
        <span>Max characters to type</span>
        <span>${this.maxCharactersToType.toHtml()}</span>
      </div>
      <div class="app-setting">
        <span>Stop on error</span>
        <span>${this.stopOnErrorSwitch.toHtml()}</span>
      </div>
      <div id="${this.enableCapitalLettersContainerId}" class="app-setting">
        <span>Enable capital letters</span>
        <span>${this.enableCapitalLettersSwitch.toHtml()}</span>
      </div>
      <div id="${this.enablePunctuationCharactersContainerId}" class="app-setting">
        <span>Enable punctuation characters</span>
        <span>${this.enablePunctuationCharactersSwitch.toHtml()}</span>
      </div>
      <div class="app-setting">
        <span>Enable sounds</span>
        <span>${this.enableSoundsSwitch.toHtml()}</span>
      </div>
    `;
  }

  getDialogFooter(): string {
    return /* html */ `
      <div class="app-settings-dialog-footer">
        ${this.cancelButton.toHtml()}
        ${this.saveButton.toHtml()}
      </div>
    `;
  }

  postInsertHtmlInternal(): void {
    this.enableCapitalLettersContainer = document.getElementById(this.enableCapitalLettersContainerId);
    this.enablePunctuationCharactersContainer = document.getElementById(this.enablePunctuationCharactersContainerId);
    this.stopOnErrorSwitch.postInsertHtml();
    this.enableCapitalLettersSwitch.postInsertHtml();
    this.enablePunctuationCharactersSwitch.postInsertHtml();
    this.enableSoundsSwitch.postInsertHtml();
    this.textToTypeCategoriesSelect.postInsertHtml();
    this.textToTypeLanguagesSelect.postInsertHtml();
    this.maxCharactersToType.postInsertHtml();
    this.saveButton.postInsertHtml();
    this.cancelButton.postInsertHtml();
    this.appState = this.getAppState();
    this.updateInnerHTML();
    this.maxCharactersToType.onValidate(this.validateMaxCharactersToType);
    this.stopOnErrorSwitch.onUpdate(this.handleStopOnErrorChangeEvent.bind(this));
    this.enableCapitalLettersSwitch.onUpdate(this.handleEnableCapitalLettersChangeEvent.bind(this));
    this.enablePunctuationCharactersSwitch.onUpdate(this.handleEnablePunctuationCharactersChangeEvent.bind(this));
    this.enableSoundsSwitch.onUpdate(this.handleEnableSoundsChangeEvent.bind(this));
    this.maxCharactersToType.onUpdate(this.handleMaxCharactersToTypeChangeEvent.bind(this));
    this.textToTypeCategoriesSelect.onUpdate(this.handleTextToTypeCategoryChangeEvent.bind(this));
    this.textToTypeLanguagesSelect.onUpdate(this.handleTextToTypeLanguageChangeEvent.bind(this));
    this.saveButton.onClick(this.handleValidateButtonClickEvent.bind(this));
    this.cancelButton.onClick(this.handleCancelButtonClickEvent.bind(this));
  }

  show(): void {
    this.dialog.showModal();
    this.maxCharactersToType.blur();
    this.appState = this.getAppState();
    this.updateInnerHTML();
    this.dispatchCustomEvent(START_UPDATING_APP_SETTINGS_EVENT);
  }

  hide(): void {
    super.hide();
    this.dispatchCustomEvent(END_UPDATING_APP_SETTINGS_EVENT);
  }

  private updateInnerHTML() {
    this.textToTypeCategoriesSelect.update({
      options: TEXT_TO_TYPE_CATEGORIES,
      selectedOptionValue: this.appState.textToTypeCategory,
    });
    this.textToTypeLanguagesSelect.update({
      options: getTextToTypeLanguage(this.appState.textToTypeCategory),
      selectedOptionValue: this.appState.textToTypeLanguage,
    });
    this.maxCharactersToType.update('' + this.appState.maxCharactersToType);
    this.stopOnErrorSwitch.update(this.appState.stopOnError);
    this.enableCapitalLettersSwitch.update(this.appState.enableCapitalLetters);
    this.enablePunctuationCharactersSwitch.update(this.appState.enablePunctuationCharacters);
    this.enableSoundsSwitch.update(this.appState.enableSounds);

    this.enableCapitalLettersContainer.classList.remove('hide');
    this.enablePunctuationCharactersContainer.classList.remove('hide');
    if (this.appState.textToTypeCategory == TextToTypeCategory.CODE) {
      this.enableCapitalLettersContainer.classList.add('hide');
      this.enablePunctuationCharactersContainer.classList.add('hide');
    }
  }

  private validateMaxCharactersToType(value: string) {
    const number = Number.parseInt(value);
    if (Number.isNaN(number)) {
      throw new Error('max characters to type must be a number');
    }
  }

  private handleStopOnErrorChangeEvent(value: boolean) {
    this.appState.stopOnError = value;
  }

  private handleEnableCapitalLettersChangeEvent(value: boolean) {
    this.appState.enableCapitalLetters = value;
  }

  private handleEnablePunctuationCharactersChangeEvent(value: boolean) {
    this.appState.enablePunctuationCharacters = value;
  }

  private handleEnableSoundsChangeEvent(value: boolean) {
    this.appState.enableSounds = value;
  }

  private handleMaxCharactersToTypeChangeEvent(value: string) {
    this.appState.maxCharactersToType = +value;
  }

  private handleTextToTypeCategoryChangeEvent(value: TextToTypeCategory) {
    if (value !== this.appState.textToTypeCategory) {
      this.appState.textToTypeIndex = 0;
    }
    this.appState.textToTypeCategory = value;
    if (value == TextToTypeCategory.CODE) {
      this.appState.textToTypeLanguage = TextToTypeLanguage.JAVA;
      this.appState.enableCapitalLetters = true;
      this.appState.enablePunctuationCharacters = true;
      this.enableCapitalLettersContainer.classList.add('hide');
      this.enablePunctuationCharactersContainer.classList.add('hide');
    } else {
      this.appState.textToTypeLanguage = TextToTypeLanguage.ENGLISH;
      this.appState.enableCapitalLetters = false;
      this.appState.enablePunctuationCharacters = false;
      this.enableCapitalLettersContainer.classList.remove('hide');
      this.enablePunctuationCharactersContainer.classList.remove('hide');
    }
    this.enableCapitalLettersSwitch.update(this.appState.enableCapitalLetters);
    this.enablePunctuationCharactersSwitch.update(this.appState.enablePunctuationCharacters);
    this.textToTypeLanguagesSelect.update({
      options: getTextToTypeLanguage(this.appState.textToTypeCategory),
      selectedOptionValue: this.appState.textToTypeLanguage,
    });
  }

  private handleTextToTypeLanguageChangeEvent(value: TextToTypeLanguage) {
    if (value !== this.appState.textToTypeLanguage) {
      this.appState.textToTypeIndex = 0;
    }
    this.appState.textToTypeLanguage = value;
  }

  private handleValidateButtonClickEvent() {
    this.saveAppState(this.appState);
    this.dispatchCustomEvent(APP_SETTINGS_CHANGE_EVENT);
    this.hide();
  }

  private handleCancelButtonClickEvent() {
    this.hide();
  }
}
