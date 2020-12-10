import { AppSettingsDialogHtmlComponent } from './app-settings-dialog.component';
import { BaseBlockHtmlComponent } from './base/base-block-component';
import { ChangeThemeIconHtmlComponent } from './change-theme-icon.component';

const APP_SETTINGS_ICON_ID = 'APP_SETTINGS_ICON_ID';

export class NavbarHtmlComponent extends BaseBlockHtmlComponent {
  private navbarDomElement: HTMLElement;
  private appSettingsIconDomElement: HTMLElement;
  private appSettings = new AppSettingsDialogHtmlComponent();
  private changeThemeIcon = new ChangeThemeIconHtmlComponent();

  __preInsertHtml() {
    this.appSettings.preInsertHtml();
    this.changeThemeIcon.preInsertHtml();
  }

  __toHtml() {
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
          <div class="app-settings-drop-down">${this.appSettings.toHtml()}<div>
        </div>
      </nav>
    `;
  }

  __postInsertHtml() {
    this.appSettings.postInsertHtml();
    this.navbarDomElement = document.querySelector('nav');
    this.appSettingsIconDomElement = document.getElementById(APP_SETTINGS_ICON_ID);
    this.appSettingsIconDomElement.addEventListener('click', this.handleAppSettingsIconClickEvent.bind(this));
    window.addEventListener('scroll', this.onWindowScrollEvent.bind(this));
    this.changeThemeIcon.postInsertHtml();
  }

  private handleAppSettingsIconClickEvent(event) {
    event.stopPropagation();
    this.appSettings.show();
  }

  private onWindowScrollEvent() {
    if (window.scrollY === 0) {
      this.navbarDomElement.classList.remove('shadow');
    } else {
      this.navbarDomElement.classList.add('shadow');
    }
  }
}
