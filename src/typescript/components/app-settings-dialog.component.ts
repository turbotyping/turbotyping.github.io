import { APP_SETTINGS_CHANGE_EVENT } from '../constants/event.constant';
import { TextToTypeCategory, TEXT_TO_TYPE_CATEGORIES } from '../models/text-to-type-category.enum';
import { getTextToTypeLanguage, TextToTypeLanguage } from '../models/text-to-type-language.enum';
import { BaseDialogHtmlComponent } from './base/base-dialog.component';
import { ChangeThemeIconHtmlComponent } from './change-theme-icon.component';
import { InputHtmlComponent } from './core/input.component';
import { SelectHtmlComponent } from './core/select.component';
import { SwitchHtmlComponent } from './core/switch.component';

export class AppSettingsDialogHtmlComponent extends BaseDialogHtmlComponent {
  private changeThemeIcon = new ChangeThemeIconHtmlComponent();
  private stopOnErrorSwitch: SwitchHtmlComponent;
  private enableCapitalLettersSwitch: SwitchHtmlComponent;
  private enablePunctuationCharactersSwitch: SwitchHtmlComponent;
  private enableSoundsSwitch: SwitchHtmlComponent;
  private maxCharactersToType: InputHtmlComponent;
  private textToTypeCategoriesSelect: SelectHtmlComponent<TextToTypeCategory>;
  private textToTypeLanguagesSelect: SelectHtmlComponent<TextToTypeLanguage>;
  private textToTypeLanguagesContainer: HTMLElement;
  private enableCapitalLettersContainer: HTMLElement;
  private enablePunctuationCharactersContainer: HTMLElement;
  private textToTypeLanguagesContainerId: string;
  private enableCapitalLettersContainerId: string;
  private enablePunctuationCharactersContainerId: string;

  __preInsertHtml(): void {
    this.enableCapitalLettersContainerId = this.getRandomId();
    this.enablePunctuationCharactersContainerId = this.getRandomId();
    this.textToTypeLanguagesContainerId = this.getRandomId();
    const appStorage = this.getAppStorage();
    appStorage.textToTypeCategory = appStorage.textToTypeCategory || TextToTypeCategory.CODE;
    appStorage.textToTypeLanguage = appStorage.textToTypeLanguage || TextToTypeLanguage.HTML;
    appStorage.stopOnError = appStorage.stopOnError || false;
    appStorage.enableCapitalLetters = appStorage.enableCapitalLetters || false;
    appStorage.enablePunctuationCharacters = appStorage.enablePunctuationCharacters || false;
    appStorage.enableSounds = appStorage.enableSounds || false;
    appStorage.maxCharactersToType = appStorage.maxCharactersToType || 2000;
    this.stopOnErrorSwitch = new SwitchHtmlComponent(appStorage.stopOnError);
    this.enableCapitalLettersSwitch = new SwitchHtmlComponent(appStorage.enableCapitalLetters);
    this.enableSoundsSwitch = new SwitchHtmlComponent(appStorage.enableSounds);
    this.enablePunctuationCharactersSwitch = new SwitchHtmlComponent(appStorage.enablePunctuationCharacters);
    this.maxCharactersToType = new InputHtmlComponent(appStorage.maxCharactersToType.toString());
    this.textToTypeCategoriesSelect = new SelectHtmlComponent<TextToTypeCategory>(TEXT_TO_TYPE_CATEGORIES, appStorage.textToTypeCategory);
    this.textToTypeLanguagesSelect = new SelectHtmlComponent<TextToTypeLanguage>(
      getTextToTypeLanguage(appStorage.textToTypeCategory),
      appStorage.textToTypeLanguage
    );
    this.changeThemeIcon.preInsertHtml();
    this.stopOnErrorSwitch.preInsertHtml();
    this.enableCapitalLettersSwitch.preInsertHtml();
    this.enablePunctuationCharactersSwitch.preInsertHtml();
    this.enableSoundsSwitch.preInsertHtml();
    this.maxCharactersToType.preInsertHtml();
    this.textToTypeCategoriesSelect.preInsertHtml();
    this.textToTypeLanguagesSelect.preInsertHtml();
    this.saveAppStorage(appStorage);
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
        <span>Change theme</span>
        <span>${this.changeThemeIcon.toHtml()}</span>
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

  __postInsertHtml(): void {
    this.enableCapitalLettersContainer = document.getElementById(this.enableCapitalLettersContainerId);
    this.enablePunctuationCharactersContainer = document.getElementById(this.enablePunctuationCharactersContainerId);
    this.textToTypeLanguagesContainer = document.getElementById(this.textToTypeLanguagesContainerId);
    this.changeThemeIcon.postInsertHtml();
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
    const appStorage = this.getAppStorage();
    appStorage.stopOnError = value;
    this.saveAppStorage(appStorage);
    this.dispatchCustomEvent(APP_SETTINGS_CHANGE_EVENT);
  }

  private handleEnableCapitalLettersChangeEvent(value: boolean) {
    const appStorage = this.getAppStorage();
    appStorage.enableCapitalLetters = value;
    this.saveAppStorage(appStorage);
    this.dispatchCustomEvent(APP_SETTINGS_CHANGE_EVENT);
  }

  private handleEnablePunctuationCharactersChangeEvent(value: boolean) {
    const appStorage = this.getAppStorage();
    appStorage.enablePunctuationCharacters = value;
    this.saveAppStorage(appStorage);
    this.dispatchCustomEvent(APP_SETTINGS_CHANGE_EVENT);
  }

  private handleEnableSoundsChangeEvent(value: boolean) {
    const appStorage = this.getAppStorage();
    appStorage.enableSounds = value;
    this.saveAppStorage(appStorage);
    this.dispatchCustomEvent(APP_SETTINGS_CHANGE_EVENT);
  }

  private handleMaxCharactersToTypeChangeEvent(value: string) {
    const appStorage = this.getAppStorage();
    appStorage.maxCharactersToType = +value;
    this.saveAppStorage(appStorage);
    this.dispatchCustomEvent(APP_SETTINGS_CHANGE_EVENT);
  }

  private handleTextToTypeCategoryChangeEvent(value: TextToTypeCategory) {
    const appStorage = this.getAppStorage();
    if (value !== appStorage.textToTypeCategory) {
      appStorage.textToTypeIndex = 0;
    }
    appStorage.textToTypeCategory = value;
    this.enableCapitalLettersContainer.classList.remove('hide');
    this.enablePunctuationCharactersContainer.classList.remove('hide');
    appStorage.textToTypeLanguage = TextToTypeLanguage.ENGLISH;
    if (value == TextToTypeCategory.CODE) {
      appStorage.textToTypeLanguage = TextToTypeLanguage.JAVA;
      appStorage.enableCapitalLetters = true;
      appStorage.enablePunctuationCharacters = true;
      this.enableCapitalLettersContainer.classList.add('hide');
      this.enablePunctuationCharactersContainer.classList.add('hide');
    }
    this.textToTypeLanguagesSelect = new SelectHtmlComponent<TextToTypeLanguage>(
      getTextToTypeLanguage(appStorage.textToTypeCategory),
      appStorage.textToTypeLanguage
    );
    this.textToTypeLanguagesSelect.preInsertHtml();
    this.textToTypeLanguagesContainer.innerHTML = this.textToTypeLanguagesSelect.toHtml();
    this.textToTypeLanguagesSelect.postInsertHtml();
    this.textToTypeLanguagesSelect.onUpdate(this.handleTextToTypeLanguageChangeEvent.bind(this));
    this.saveAppStorage(appStorage);
    this.dispatchCustomEvent(APP_SETTINGS_CHANGE_EVENT);
  }

  private updateAppSettingsBasedOnTextToTypeCategoryAndLanguage() {
    const appStorage = this.getAppStorage();
    this.enableCapitalLettersContainer.classList.remove('hide');
    this.enablePunctuationCharactersContainer.classList.remove('hide');
    if (appStorage.textToTypeCategory == TextToTypeCategory.CODE) {
      appStorage.enableCapitalLetters = true;
      appStorage.enablePunctuationCharacters = true;
      this.enableCapitalLettersContainer.classList.add('hide');
      this.enablePunctuationCharactersContainer.classList.add('hide');
    }
    this.textToTypeLanguagesSelect = new SelectHtmlComponent<TextToTypeLanguage>(
      getTextToTypeLanguage(appStorage.textToTypeCategory),
      appStorage.textToTypeLanguage
    );
  }

  private handleTextToTypeLanguageChangeEvent(value: TextToTypeLanguage) {
    const appStorage = this.getAppStorage();
    if (value !== appStorage.textToTypeLanguage) {
      appStorage.textToTypeIndex = 0;
    }
    appStorage.textToTypeLanguage = value;
    this.saveAppStorage(appStorage);
    this.dispatchCustomEvent(APP_SETTINGS_CHANGE_EVENT);
  }
}
