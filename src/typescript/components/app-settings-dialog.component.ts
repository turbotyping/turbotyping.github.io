import {
  APP_SETTINGS_CHANGE_EVENT,
  ENABLE_CAPITAL_LETTERS_CHANGE_EVENT,
  ENABLE_PUNCTUATION_CHARACTERS_CHANGE_EVENT,
  STOP_ON_ERROR_CHANGE_EVENT,
} from '../constants/event.constant';
import { AbstractDialogHtmlComponent } from './abstract-dialog.component';
import { ChangeThemeIconHtmlComponent } from './change-theme-icon.component';
import { SwitchHtmlComponent, SwitchState } from './switch.component';

export class AppSettingsDialogHtmlComponent extends AbstractDialogHtmlComponent {
  private changeThemeIcon = new ChangeThemeIconHtmlComponent();
  private stopOnErrorSwitch: SwitchHtmlComponent;
  private enableCapitalLettersSwitch: SwitchHtmlComponent;
  private enablePunctuationCharactersSwitch: SwitchHtmlComponent;

  __preInsertHtml(): void {
    const appStorage = this.getAppStorage();
    appStorage.stopOnError = appStorage.stopOnError || false;
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

  getDialogTitle(): string {
    return 'Settings';
  }

  getDialogBody(): string {
    return /* html */ `
      <div class="app-setting">
        <span>Change theme</span>
        <span>${this.changeThemeIcon.toHtml()}</span>
      </div>
      <div class="app-setting">
        <span>Stop on error</span>
        <span>${this.stopOnErrorSwitch.toHtml()}</span>
      </div>
      <div class="app-setting">
        <span>Enable capital letters</span>
        <span>${this.enableCapitalLettersSwitch.toHtml()}</span>
      </div>
      <div class="app-setting">
        <span>Enable punctuation characters</span>
        <span>${this.enablePunctuationCharactersSwitch.toHtml()}</span>
      </div>
    `;
  }

  __postInsertHtml(): void {
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
