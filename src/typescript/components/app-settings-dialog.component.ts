import {
  APP_SETTINGS_CHANGE_EVENT,
  ENABLE_CAPITAL_LETTERS_CHANGE_EVENT,
  ENABLE_PUNCTUATION_CHARACTERS_CHANGE_EVENT,
  ENABLE_SOUNDS_CHANGE_EVENT,
  STOP_ON_ERROR_CHANGE_EVENT,
} from '../constants/event.constant';
import { BaseDialogHtmlComponent } from './base/base-dialog.component';
import { ChangeThemeIconHtmlComponent } from './change-theme-icon.component';
import { SwitchHtmlComponent } from './core/switch.component';

export class AppSettingsDialogHtmlComponent extends BaseDialogHtmlComponent {
  private changeThemeIcon = new ChangeThemeIconHtmlComponent();
  private stopOnErrorSwitch: SwitchHtmlComponent;
  private enableCapitalLettersSwitch: SwitchHtmlComponent;
  private enablePunctuationCharactersSwitch: SwitchHtmlComponent;
  private enableSoundsSwitch: SwitchHtmlComponent;

  __preInsertHtml(): void {
    const appStorage = this.getAppStorage();
    appStorage.stopOnError = appStorage.stopOnError || false;
    appStorage.enableCapitalLetters = appStorage.enableCapitalLetters || false;
    appStorage.enablePunctuationCharacters = appStorage.enablePunctuationCharacters || false;
    appStorage.enableSounds = appStorage.enableSounds || false;
    this.stopOnErrorSwitch = new SwitchHtmlComponent(STOP_ON_ERROR_CHANGE_EVENT, appStorage.stopOnError);
    this.enableCapitalLettersSwitch = new SwitchHtmlComponent(ENABLE_CAPITAL_LETTERS_CHANGE_EVENT, appStorage.enableCapitalLetters);
    this.enablePunctuationCharactersSwitch = new SwitchHtmlComponent(
      ENABLE_PUNCTUATION_CHARACTERS_CHANGE_EVENT,
      appStorage.enablePunctuationCharacters
    );
    this.enableSoundsSwitch = new SwitchHtmlComponent(ENABLE_SOUNDS_CHANGE_EVENT, appStorage.enableSounds);
    this.changeThemeIcon.preInsertHtml();
    this.stopOnErrorSwitch.preInsertHtml();
    this.enableCapitalLettersSwitch.preInsertHtml();
    this.enablePunctuationCharactersSwitch.preInsertHtml();
    this.enableSoundsSwitch.preInsertHtml();
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
      <div class="app-setting">
        <span>Enable sounds</span>
        <span>${this.enableSoundsSwitch.toHtml()}</span>
      </div>
    `;
  }

  __postInsertHtml(): void {
    this.changeThemeIcon.postInsertHtml();
    this.stopOnErrorSwitch.postInsertHtml();
    this.enableCapitalLettersSwitch.postInsertHtml();
    this.enablePunctuationCharactersSwitch.postInsertHtml();
    this.enableSoundsSwitch.postInsertHtml();
    this.addCustomEventListener(STOP_ON_ERROR_CHANGE_EVENT, this.handleStopOnErrorChangeEvent.bind(this));
    this.addCustomEventListener(ENABLE_CAPITAL_LETTERS_CHANGE_EVENT, this.handleEnableCapitalLettersChangeEvent.bind(this));
    this.addCustomEventListener(ENABLE_PUNCTUATION_CHARACTERS_CHANGE_EVENT, this.handleEnablePunctuationCharactersChangeEvent.bind(this));
    this.addCustomEventListener(ENABLE_SOUNDS_CHANGE_EVENT, this.handleEnableSoundsChangeEvent.bind(this));
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

  private handleEnablePunctuationCharactersChangeEvent() {
    const appStorage = this.getAppStorage();
    appStorage.enablePunctuationCharacters = !appStorage.enablePunctuationCharacters;
    this.saveAppStorage(appStorage);
    this.dispatchCustomEvent(APP_SETTINGS_CHANGE_EVENT);
  }

  private handleEnableSoundsChangeEvent() {
    const appStorage = this.getAppStorage();
    appStorage.enableSounds = !appStorage.enableSounds;
    this.saveAppStorage(appStorage);
    this.dispatchCustomEvent(APP_SETTINGS_CHANGE_EVENT);
  }
}
