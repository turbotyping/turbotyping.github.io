import { DARK_THEME_VALUE, LIGHT_THEME_VALUE } from '../constants/constant';
import { CHANGE_THEME_EVENT } from '../constants/event.constant';
import { BaseHtmlComponent } from './component';

const CHANGE_TO_DARK_THEME_ICON_ID = 'CHANGE_TO_DARK_THEME_ICON_ID';
const CHANGE_TO_LIGHT_THEME_ICON_ID = 'CHANGE_TO_LIGHT_THEME_ICON_ID';

export class ChangeThemeIconHtmlComponent extends BaseHtmlComponent {
  private changeToDarkThemeButtonDomElement: HTMLElement;
  private changeToLightThemeButtonDomElement: HTMLElement;

  _toHtml() {
    return /* html */ `
      <span class="change-theme-icon-container">
        <span id='${CHANGE_TO_DARK_THEME_ICON_ID}' class='pointer change-theme-icon'>
          <span class='iconify' data-icon='bx:bx-moon' data-inline='false'></span>
        </span>
        <span id='${CHANGE_TO_LIGHT_THEME_ICON_ID}' class='pointer change-theme-icon'>
          <span class='iconify' data-icon='heroicons-solid:sun' data-inline='false'></span>
        </span>
      </span>
    `;
  }

  _postInsertHtml() {
    this.initDomElements();
    this.setThemeFromLocalStorage();
    this.showHideToggleThemeIcons();
    this.changeToDarkThemeButtonDomElement.addEventListener('click', this.handleToggleThemeClickEvent.bind(this));
    this.changeToLightThemeButtonDomElement.addEventListener('click', this.handleToggleThemeClickEvent.bind(this));
  }

  private initDomElements() {
    this.changeToDarkThemeButtonDomElement = document.getElementById(CHANGE_TO_DARK_THEME_ICON_ID);
    this.changeToLightThemeButtonDomElement = document.getElementById(CHANGE_TO_LIGHT_THEME_ICON_ID);
  }

  private setThemeFromLocalStorage() {
    const appStorage = this.getAppStorage();
    appStorage.currentTheme = appStorage.currentTheme || LIGHT_THEME_VALUE;
    document.body.classList.remove(DARK_THEME_VALUE, LIGHT_THEME_VALUE);
    document.body.classList.add(appStorage.currentTheme);
    this.saveAppStorage(appStorage);
  }

  private showHideToggleThemeIcons() {
    if (this.getAppStorage().currentTheme === LIGHT_THEME_VALUE) {
      this.changeToDarkThemeButtonDomElement.style.display = 'flex';
    } else {
      this.changeToLightThemeButtonDomElement.style.display = 'flex';
    }
  }

  private handleToggleThemeClickEvent(event: any) {
    event.stopPropagation();
    const appStorage = this.getAppStorage();
    if (appStorage.currentTheme === LIGHT_THEME_VALUE) {
      document.body.classList.remove(DARK_THEME_VALUE, LIGHT_THEME_VALUE);
      document.body.classList.add(DARK_THEME_VALUE);
      appStorage.currentTheme = DARK_THEME_VALUE;
      this.saveAppStorage(appStorage);
      this.changeToDarkThemeButtonDomElement.style.display = 'none';
      this.changeToLightThemeButtonDomElement.style.display = 'flex';
      this.dispatchChangeThemeEvent(DARK_THEME_VALUE);
    } else {
      document.body.classList.remove(DARK_THEME_VALUE, LIGHT_THEME_VALUE);
      document.body.classList.add(LIGHT_THEME_VALUE);
      appStorage.currentTheme = LIGHT_THEME_VALUE;
      this.saveAppStorage(appStorage);
      this.changeToDarkThemeButtonDomElement.style.display = 'flex';
      this.changeToLightThemeButtonDomElement.style.display = 'none';
      this.dispatchChangeThemeEvent(LIGHT_THEME_VALUE);
    }
  }

  private dispatchChangeThemeEvent(newTheme: string) {
    this.dispatchCustomEvent(CHANGE_THEME_EVENT, {
      newTheme,
    });
  }
}
