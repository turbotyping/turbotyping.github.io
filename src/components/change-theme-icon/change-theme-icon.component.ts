import { CHANGE_THEME_EVENT, DARK_THEME_VALUE, LIGHT_THEME_VALUE } from '../../constants/constant';
import { BaseHtmlComponent } from '../_core/base-component';
import { IAppStateClient } from '../../state/app-state.client.interface';
import { IconHtmlComponent } from '../_core/icon/icon.component';

export class ChangeThemeIconHtmlComponent extends BaseHtmlComponent {
  private changeToDarkThemeButtonDomElement: IconHtmlComponent;
  private changeToLightThemeButtonDomElement: IconHtmlComponent;

  constructor(private appStateClient: IAppStateClient) {
    super();
  }

  preInsertHtml(): void {
    const appState = this.appStateClient.getAppState();
    appState.currentTheme = appState.currentTheme || LIGHT_THEME_VALUE;
    document.body.classList.remove(DARK_THEME_VALUE, LIGHT_THEME_VALUE);
    document.body.classList.add(appState.currentTheme);
    this.appStateClient.saveAppState(appState);
    this.changeToDarkThemeButtonDomElement = new IconHtmlComponent('bx:bx-moon', 'Toggle Theme');
    this.changeToLightThemeButtonDomElement = new IconHtmlComponent('heroicons-solid:sun', 'Toggle Theme');
    this.changeToDarkThemeButtonDomElement.preInsertHtml();
    this.changeToLightThemeButtonDomElement.preInsertHtml();
  }

  toHtml() {
    return /* html */ `
      ${this.changeToDarkThemeButtonDomElement.toHtml()}
      ${this.changeToLightThemeButtonDomElement.toHtml()}
    `;
  }

  postInsertHtml() {
    this.changeToDarkThemeButtonDomElement.postInsertHtml();
    this.changeToLightThemeButtonDomElement.postInsertHtml();
    this.changeToDarkThemeButtonDomElement.onClick(this.handleToggleThemeClickEvent.bind(this));
    this.changeToLightThemeButtonDomElement.onClick(this.handleToggleThemeClickEvent.bind(this));
    this.updateInnerHTML();
  }

  private updateInnerHTML() {
    this.changeToDarkThemeButtonDomElement.hide();
    this.changeToLightThemeButtonDomElement.hide();
    if (this.appStateClient.getAppState().currentTheme === LIGHT_THEME_VALUE) {
      this.changeToDarkThemeButtonDomElement.show();
    } else {
      this.changeToLightThemeButtonDomElement.show();
    }
  }

  private handleToggleThemeClickEvent() {
    const appStorage = this.appStateClient.getAppState();
    if (appStorage.currentTheme === LIGHT_THEME_VALUE) {
      document.body.classList.remove(DARK_THEME_VALUE, LIGHT_THEME_VALUE);
      document.body.classList.add(DARK_THEME_VALUE);
      appStorage.currentTheme = DARK_THEME_VALUE;
      this.appStateClient.saveAppState(appStorage);
      this.dispatchChangeThemeEvent(DARK_THEME_VALUE);
    } else {
      document.body.classList.remove(DARK_THEME_VALUE, LIGHT_THEME_VALUE);
      document.body.classList.add(LIGHT_THEME_VALUE);
      appStorage.currentTheme = LIGHT_THEME_VALUE;
      this.appStateClient.saveAppState(appStorage);
      this.dispatchChangeThemeEvent(LIGHT_THEME_VALUE);
    }
    this.updateInnerHTML();
    this.changeToDarkThemeButtonDomElement.focus();
    this.changeToLightThemeButtonDomElement.focus();
  }

  private dispatchChangeThemeEvent(newTheme: string) {
    this.dispatchCustomEvent(CHANGE_THEME_EVENT, {
      newTheme,
    });
  }
}
