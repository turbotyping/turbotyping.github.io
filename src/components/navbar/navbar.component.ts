import './navbar.scss';
import { AppSettingsDialogHtmlComponent } from '../app-settings-dialog/app-settings-dialog.component';
import { ChangeThemeIconHtmlComponent } from '../change-theme-icon/change-theme-icon.component';
import { BaseHtmlComponent } from '../_core/base-component';
import { AppStateClient } from '../_state/app-state.client';

const APP_SETTINGS_ICON_ID = 'APP_SETTINGS_ICON_ID';

export class NavbarHtmlComponent extends BaseHtmlComponent {
  private navbarDomElement: HTMLElement;
  private appSettingsIconDomElement: HTMLElement;
  private appSettingsDialog: AppSettingsDialogHtmlComponent;
  private changeThemeIcon: ChangeThemeIconHtmlComponent;

  constructor() {
    super();
    this.appSettingsDialog = new AppSettingsDialogHtmlComponent(AppStateClient.getInstance());
    this.changeThemeIcon = new ChangeThemeIconHtmlComponent(AppStateClient.getInstance());
  }

  preInsertHtml() {
    this.appSettingsDialog.preInsertHtml();
    this.changeThemeIcon.preInsertHtml();
  }

  toHtml() {
    return /* html */ `
      <nav>
        <div class='left'>
          <a href='/'>
            <img src='/logo.png' alt='logo' />
            <span>DEV Keyboard</span>
          </a>
        </div>
        <div class='right'>
          ${this.changeThemeIcon.toHtml()}
          <span ID="${APP_SETTINGS_ICON_ID}"><span class="iconify" data-icon="jam:settings-alt" data-inline="false" data-rotate="270deg"></span></span>
          <div class="app-settings-drop-down">${this.appSettingsDialog.toHtml()}<div>
        </div>
      </nav>
    `;
  }

  postInsertHtml() {
    this.appSettingsDialog.postInsertHtml();
    this.navbarDomElement = document.querySelector('nav');
    this.appSettingsIconDomElement = document.getElementById(APP_SETTINGS_ICON_ID);
    this.appSettingsIconDomElement.addEventListener('click', this.handleAppSettingsIconClickEvent.bind(this));
    window.addEventListener('scroll', this.onWindowScrollEvent.bind(this));
    this.changeThemeIcon.postInsertHtml();
  }

  getContainerQuerySelector(): string {
    return 'nav';
  }

  private handleAppSettingsIconClickEvent(event) {
    event.stopPropagation();
    this.appSettingsDialog.show();
  }

  private onWindowScrollEvent() {
    if (window.scrollY === 0) {
      this.navbarDomElement.classList.remove('shadow');
    } else {
      this.navbarDomElement.classList.add('shadow');
    }
  }
}
