import {
  APP_SETTINGS_CHANGE_EVENT,
  ENABLE_CAPITAL_LETTERS_CHANGE_EVENT,
  ENABLE_PUNCTUATION_LETTERS_CHANGE_EVENT as ENABLE_PUNCTUATION_CHARACTERS_CHANGE_EVENT,
  STOP_ON_ERROR_CHANGE_EVENT,
} from '../constants/event.constant';
import { ChangeThemeIconHtmlComponent } from './change-theme-icon.component';
import { BaseBlockHtmlComponent } from './component';
import { SwitchHtmlComponent, SwitchState } from './switch.component';

export class AppSettingsHtmlComponent extends BaseBlockHtmlComponent {
  private changeThemeIcon = new ChangeThemeIconHtmlComponent();
  private stopOnErrorSwitch: SwitchHtmlComponent;
  private enableCapitalLettersSwitch: SwitchHtmlComponent;
  private enablePunctuationCharactersSwitch: SwitchHtmlComponent;
  private container: HTMLElement;

  __preInsertHtml(): void {
    const appStorage = this.getAppStorage();
    appStorage.stopOnError = appStorage.stopOnError || true;
    appStorage.enableCapitalLetters = appStorage.enableCapitalLetters || false;
    appStorage.enablePunctuationCharacters = appStorage.enablePunctuationCharacters || false;
    const stopOnErrorState = appStorage.stopOnError ? SwitchState.ON : SwitchState.OFF;
    const enableCapitalLettersState = appStorage.enableCapitalLetters ? SwitchState.ON : SwitchState.OFF;
    const enablePunctuationCharacters = appStorage.enablePunctuationCharacters ? SwitchState.ON : SwitchState.OFF;
    this.stopOnErrorSwitch = new SwitchHtmlComponent(STOP_ON_ERROR_CHANGE_EVENT, stopOnErrorState);
    this.enableCapitalLettersSwitch = new SwitchHtmlComponent(ENABLE_CAPITAL_LETTERS_CHANGE_EVENT, enableCapitalLettersState);
    this.enablePunctuationCharactersSwitch = new SwitchHtmlComponent(ENABLE_PUNCTUATION_CHARACTERS_CHANGE_EVENT, enablePunctuationCharacters);
    this.changeThemeIcon.preInsertHtml();
    this.stopOnErrorSwitch.preInsertHtml();
    this.enableCapitalLettersSwitch.preInsertHtml();
    this.enablePunctuationCharactersSwitch.preInsertHtml();
    this.saveAppStorage(appStorage);
  }

  __toHtml() {
    return /* html */ `
      <div class="app-settings-container">
        <div class="app-setting-container">
          <span>Change theme</span>
          <span>${this.changeThemeIcon.toHtml()}</span>
        </div>
        <div class="app-setting-container">
          <span>Stop on error</span>
          <span>${this.stopOnErrorSwitch.toHtml()}</span>
        </div>
        <div class="app-setting-container">
          <span>Enable capital letters</span>
          <span>${this.enableCapitalLettersSwitch.toHtml()}</span>
        </div>
        <div class="app-setting-container">
          <span>Enable punctuation characters</span>
          <span>${this.enablePunctuationCharactersSwitch.toHtml()}</span>
        </div>
      </div>
    `;
  }

  __postInsertHtml(): void {
    this.container = document.querySelector('.app-settings-container');
    this.container.addEventListener('click', this.stopPropagation.bind(this));
    this.changeThemeIcon.postInsertHtml();
    this.stopOnErrorSwitch.postInsertHtml();
    this.enableCapitalLettersSwitch.postInsertHtml();
    this.enablePunctuationCharactersSwitch.postInsertHtml();
    this.addCustomEventListener(STOP_ON_ERROR_CHANGE_EVENT, this.handleStopOnErrorChangeEvent.bind(this));
    this.addCustomEventListener(ENABLE_CAPITAL_LETTERS_CHANGE_EVENT, this.handleEnableCapitalLettersChangeEvent.bind(this));
    this.addCustomEventListener(ENABLE_PUNCTUATION_CHARACTERS_CHANGE_EVENT, this.handlePunctuationCharactersChangeEvent.bind(this));
  }

  private handleStopOnErrorChangeEvent() {
    const appStorage = this.getAppStorage();
    appStorage.stopOnError = !appStorage.stopOnError;
    this.saveAppStorage(appStorage);
    this.dispatchCustomEvent(APP_SETTINGS_CHANGE_EVENT);
  }

  private handleEnableCapitalLettersChangeEvent() {
    const appStorage = this.getAppStorage();
    appStorage.enableCapitalLetters = !appStorage.enableCapitalLetters;
    this.saveAppStorage(appStorage);
    this.dispatchCustomEvent(APP_SETTINGS_CHANGE_EVENT);
  }

  private handlePunctuationCharactersChangeEvent() {
    const appStorage = this.getAppStorage();
    appStorage.enablePunctuationCharacters = !appStorage.enablePunctuationCharacters;
    this.saveAppStorage(appStorage);
    this.dispatchCustomEvent(APP_SETTINGS_CHANGE_EVENT);
  }
}
