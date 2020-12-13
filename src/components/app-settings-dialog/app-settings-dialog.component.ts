import './app-settings-dialog.scss';
import { APP_SETTINGS_CHANGE_EVENT } from '../../constants/constant';
import { AppState } from '../common/ts/base/app-state.model';
import { BaseDialogHtmlComponent } from '../common/ts/dialog/base-dialog-component';
import { InputHtmlComponent } from '../common/ts/input/input.component';
import { SelectHtmlComponent } from '../common/ts/select/select.component';
import { SwitchHtmlComponent } from '../common/ts/switch/switch.component';
import { TextToTypeCategory, TEXT_TO_TYPE_CATEGORIES } from '../text-to-type/text-to-type-category.enum';
import { getTextToTypeLanguage, TextToTypeLanguage } from '../text-to-type/text-to-type-language.enum';

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

  constructor() {
    super();
  }

  preInsertHtmlInternal(): void {
    this.enableCapitalLettersContainerId = this.generateId();
    this.enablePunctuationCharactersContainerId = this.generateId();
    this.textToTypeLanguagesContainerId = this.generateId();
    const appStorage = this.getAppState();
    appStorage.textToTypeCategory = appStorage.textToTypeCategory || TextToTypeCategory.QUOTES;
    appStorage.textToTypeLanguage = appStorage.textToTypeLanguage || TextToTypeLanguage.ENGLISH;
    appStorage.stopOnError = appStorage.stopOnError || false;
    appStorage.enableCapitalLetters = appStorage.enableCapitalLetters || true;
    appStorage.enablePunctuationCharacters = appStorage.enablePunctuationCharacters || true;
    appStorage.enableSounds = appStorage.enableSounds || false;
    appStorage.maxCharactersToType = appStorage.maxCharactersToType || 2000;
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
    this.stopOnErrorSwitch.preInsertHtml();
    this.enableCapitalLettersSwitch.preInsertHtml();
    this.enablePunctuationCharactersSwitch.preInsertHtml();
    this.enableSoundsSwitch.preInsertHtml();
    this.maxCharactersToType.preInsertHtml();
    this.textToTypeCategoriesSelect.preInsertHtml();
    this.textToTypeLanguagesSelect.preInsertHtml();
    this.saveAppState(appStorage);
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
    this.maxCharactersToType.onValidate(this.validateMaxCharactersToType);
    this.stopOnErrorSwitch.onUpdate(this.handleStopOnErrorChangeEvent.bind(this));
    this.enableCapitalLettersSwitch.onUpdate(this.handleEnableCapitalLettersChangeEvent.bind(this));
    this.enablePunctuationCharactersSwitch.onUpdate(this.handleEnablePunctuationCharactersChangeEvent.bind(this));
    this.enableSoundsSwitch.onUpdate(this.handleEnableSoundsChangeEvent.bind(this));
    this.maxCharactersToType.onUpdate(this.handleMaxCharactersToTypeChangeEvent.bind(this));
    this.textToTypeCategoriesSelect.onUpdate(this.handleTextToTypeCategoryChangeEvent.bind(this));
    this.textToTypeLanguagesSelect.onUpdate(this.handleTextToTypeLanguageChangeEvent.bind(this));
    this.updateAppSettingsBasedOnTextToTypeCategoryAndLanguage();
  }

  show(): void {
    this.dialog.showModal();
    this.maxCharactersToType.blur();
  }

  private validateMaxCharactersToType(value: string) {
    const number = Number.parseInt(value);
    if (Number.isNaN(number)) {
      throw new Error('max characters to type must be a number');
    }
  }

  private handleStopOnErrorChangeEvent(value: boolean) {
    const appStorage = this.getAppState();
    appStorage.stopOnError = value;
    this.saveAppState(appStorage);
    this.dispatchCustomEvent(APP_SETTINGS_CHANGE_EVENT);
  }

  private handleEnableCapitalLettersChangeEvent(value: boolean) {
    const appStorage = this.getAppState();
    appStorage.enableCapitalLetters = value;
    this.saveAppState(appStorage);
    this.dispatchCustomEvent(APP_SETTINGS_CHANGE_EVENT);
  }

  private handleEnablePunctuationCharactersChangeEvent(value: boolean) {
    const appStorage = this.getAppState();
    appStorage.enablePunctuationCharacters = value;
    this.saveAppState(appStorage);
    this.dispatchCustomEvent(APP_SETTINGS_CHANGE_EVENT);
  }

  private handleEnableSoundsChangeEvent(value: boolean) {
    const appStorage = this.getAppState();
    appStorage.enableSounds = value;
    this.saveAppState(appStorage);
    this.dispatchCustomEvent(APP_SETTINGS_CHANGE_EVENT);
  }

  private handleMaxCharactersToTypeChangeEvent(value: string) {
    const appStorage = this.getAppState();
    appStorage.maxCharactersToType = +value;
    this.saveAppState(appStorage);
    this.dispatchCustomEvent(APP_SETTINGS_CHANGE_EVENT);
  }

  private handleTextToTypeCategoryChangeEvent(value: TextToTypeCategory) {
    const appStorage = this.getAppState();
    if (value !== appStorage.textToTypeCategory) {
      appStorage.textToTypeIndex = 0;
    }
    appStorage.textToTypeCategory = value;
    if (value == TextToTypeCategory.CODE) {
      appStorage.textToTypeLanguage = TextToTypeLanguage.JAVA;
      appStorage.enableCapitalLetters = true;
      appStorage.enablePunctuationCharacters = true;
      this.enableCapitalLettersContainer.classList.add('hide');
      this.enablePunctuationCharactersContainer.classList.add('hide');
    } else {
      appStorage.textToTypeLanguage = TextToTypeLanguage.ENGLISH;
      appStorage.enableCapitalLetters = false;
      appStorage.enablePunctuationCharacters = false;
      this.enableCapitalLettersContainer.classList.remove('hide');
      this.enablePunctuationCharactersContainer.classList.remove('hide');
    }
    this.enableCapitalLettersSwitch.update(appStorage.enableCapitalLetters);
    this.enablePunctuationCharactersSwitch.update(appStorage.enablePunctuationCharacters);
    this.textToTypeLanguagesSelect.update({
      options: getTextToTypeLanguage(appStorage.textToTypeCategory),
      selectedOptionValue: appStorage.textToTypeLanguage,
    });
    this.saveAppState(appStorage);
    this.dispatchCustomEvent(APP_SETTINGS_CHANGE_EVENT);
  }

  private updateAppSettingsBasedOnTextToTypeCategoryAndLanguage() {
    const appStorage = this.getAppState();
    this.enableCapitalLettersContainer.classList.remove('hide');
    this.enablePunctuationCharactersContainer.classList.remove('hide');
    if (appStorage.textToTypeCategory == TextToTypeCategory.CODE) {
      appStorage.enableCapitalLetters = true;
      appStorage.enablePunctuationCharacters = true;
      this.enableCapitalLettersContainer.classList.add('hide');
      this.enablePunctuationCharactersContainer.classList.add('hide');
    }
    this.textToTypeLanguagesSelect.update({
      options: getTextToTypeLanguage(appStorage.textToTypeCategory),
      selectedOptionValue: appStorage.textToTypeLanguage,
    });
  }

  private handleTextToTypeLanguageChangeEvent(value: TextToTypeLanguage) {
    const appStorage = this.getAppState();
    if (value !== appStorage.textToTypeLanguage) {
      appStorage.textToTypeIndex = 0;
    }
    appStorage.textToTypeLanguage = value;
    this.saveAppState(appStorage);
    this.dispatchCustomEvent(APP_SETTINGS_CHANGE_EVENT);
  }
}
