import { CHANGE_THEME_EVENT, DARK_THEME_VALUE, LIGHT_THEME_VALUE } from '../../constants/constant';
import { AppState } from '../common/ts/base/app-state.model';
import { BaseHtmlComponent } from '../common/ts/base/base-component';

const CHANGE_TO_DARK_THEME_ICON_ID = 'CHANGE_TO_DARK_THEME_ICON_ID';
const CHANGE_TO_LIGHT_THEME_ICON_ID = 'CHANGE_TO_LIGHT_THEME_ICON_ID';

export class ChangeThemeIconHtmlComponent extends BaseHtmlComponent {
  private changeToDarkThemeButtonDomElement: HTMLElement;
  private changeToLightThemeButtonDomElement: HTMLElement;
  private containerId: string;

  constructor() {
    super();
  }

  preInsertHtml(): void {
    this.containerId = this.generateId();
    const appStorage = this.getAppState();
    appStorage.currentTheme = appStorage.currentTheme || LIGHT_THEME_VALUE;
    document.body.classList.remove(DARK_THEME_VALUE, LIGHT_THEME_VALUE);
    document.body.classList.add(appStorage.currentTheme);
    this.saveAppState(appStorage);
  }

  toHtml() {
    return /* html */ `
      <span id="${this.containerId}" class="change-theme-icon-container">
        <span id='${CHANGE_TO_DARK_THEME_ICON_ID}' class='pointer change-theme-icon'>
          <span class='iconify' data-icon='bx:bx-moon' data-inline='false'></span>
        </span>
        <span id='${CHANGE_TO_LIGHT_THEME_ICON_ID}' class='pointer change-theme-icon'>
          <span class='iconify' data-icon='heroicons-solid:sun' data-inline='false'></span>
        </span>
      </span>
    `;
  }

  postInsertHtml() {
    this.changeToDarkThemeButtonDomElement = document.getElementById(CHANGE_TO_DARK_THEME_ICON_ID);
    this.changeToLightThemeButtonDomElement = document.getElementById(CHANGE_TO_LIGHT_THEME_ICON_ID);
    this.updateInnerHTML();
    this.changeToDarkThemeButtonDomElement.addEventListener('click', this.handleToggleThemeClickEvent.bind(this));
    this.changeToLightThemeButtonDomElement.addEventListener('click', this.handleToggleThemeClickEvent.bind(this));
  }

  getContainerQuerySelector(): string {
    return this.containerId;
  }

  private updateInnerHTML() {
    this.changeToDarkThemeButtonDomElement.style.display = 'none';
    this.changeToLightThemeButtonDomElement.style.display = 'none';
    if (this.getAppState().currentTheme === LIGHT_THEME_VALUE) {
      this.changeToDarkThemeButtonDomElement.style.display = 'flex';
    } else {
      this.changeToLightThemeButtonDomElement.style.display = 'flex';
    }
  }

  private handleToggleThemeClickEvent(event: any) {
    event.stopPropagation();
    const appStorage = this.getAppState();
    if (appStorage.currentTheme === LIGHT_THEME_VALUE) {
      document.body.classList.remove(DARK_THEME_VALUE, LIGHT_THEME_VALUE);
      document.body.classList.add(DARK_THEME_VALUE);
      appStorage.currentTheme = DARK_THEME_VALUE;
      this.saveAppState(appStorage);
      this.dispatchChangeThemeEvent(DARK_THEME_VALUE);
    } else {
      document.body.classList.remove(DARK_THEME_VALUE, LIGHT_THEME_VALUE);
      document.body.classList.add(LIGHT_THEME_VALUE);
      appStorage.currentTheme = LIGHT_THEME_VALUE;
      this.saveAppState(appStorage);
      this.dispatchChangeThemeEvent(LIGHT_THEME_VALUE);
    }
    this.updateInnerHTML();
  }

  private dispatchChangeThemeEvent(newTheme: string) {
    this.dispatchCustomEvent(CHANGE_THEME_EVENT, {
      newTheme,
    });
  }
}
