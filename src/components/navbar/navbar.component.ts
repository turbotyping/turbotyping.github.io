import './navbar.scss';
import { AppSettingsDialogHtmlComponent } from '../app-settings-dialog/app-settings-dialog.component';
import { ChangeThemeIconHtmlComponent } from '../change-theme-icon/change-theme-icon.component';
import { BaseHtmlComponent } from '../_core/base-component';
import { AppStateClient } from '../../state/app-state.client';
import { AddCustomTextToTypeDialogHtmlComponent } from '../add-custom-text-to-type-dialog/add-custom-text-to-type-dialog';

const APP_SETTINGS_ICON_ID = 'APP_SETTINGS_ICON_ID';
const ADD_CUSTOM_TEXT_TO_TYPE_ICON_ID = 'ADD_CUSTOM_TEXT_TO_TYPE_ICON_ID';

export class NavbarHtmlComponent extends BaseHtmlComponent {
  private navbar: HTMLElement;
  private appSettingsIcon: HTMLElement;
  private appSettingsDialog: AppSettingsDialogHtmlComponent;
  private addCustomTextToTypeIcon: HTMLElement;
  private addCustomTextToTypeDialog: AddCustomTextToTypeDialogHtmlComponent;
  private changeThemeIcon: ChangeThemeIconHtmlComponent;

  constructor() {
    super();
    this.appSettingsDialog = new AppSettingsDialogHtmlComponent(AppStateClient.getInstance());
    this.addCustomTextToTypeDialog = new AddCustomTextToTypeDialogHtmlComponent(AppStateClient.getInstance());
    this.changeThemeIcon = new ChangeThemeIconHtmlComponent(AppStateClient.getInstance());
  }

  preInsertHtml() {
    this.appSettingsDialog.preInsertHtml();
    this.addCustomTextToTypeDialog.preInsertHtml();
    this.changeThemeIcon.preInsertHtml();
  }

  toHtml() {
    return /* html */ `
      <nav>
        <div class='left'>
          <a href='/'>
            <img src='/logo.png' alt='logo' />
            <span>Turbo Typing</span>
          </a>
        </div>
        <div class='right'>
          <span title="Change App Theme">${this.changeThemeIcon.toHtml()}</span>
          <span id="${ADD_CUSTOM_TEXT_TO_TYPE_ICON_ID}" title="Add custom text to type"><span class="iconify" data-icon="grommet-icons:add" data-inline="false"></span></span>
          <span id="${APP_SETTINGS_ICON_ID}" title="App Settings"><span class="iconify" data-icon="jam:settings-alt" data-inline="false" data-rotate="270deg"></span></span>
          <div class="app-settings-drop-down">${this.appSettingsDialog.toHtml()}<div>
          <div class="app-custom-text-to-type-dialog-container">${this.addCustomTextToTypeDialog.toHtml()}<div>
        </div>
      </nav>
    `;
  }

  postInsertHtml() {
    this.appSettingsDialog.postInsertHtml();
    this.addCustomTextToTypeDialog.postInsertHtml();
    this.navbar = document.querySelector('nav');
    this.appSettingsIcon = document.getElementById(APP_SETTINGS_ICON_ID);
    this.appSettingsIcon.addEventListener('click', this.handleAppSettingsIconClickEvent.bind(this));
    this.addCustomTextToTypeIcon = document.getElementById(ADD_CUSTOM_TEXT_TO_TYPE_ICON_ID);
    this.addCustomTextToTypeIcon.addEventListener('click', this.handleAAddCustomTextToTypeIconClickEvent.bind(this));
    window.addEventListener('scroll', this.onWindowScrollEvent.bind(this));
    this.changeThemeIcon.postInsertHtml();
  }

  private handleAppSettingsIconClickEvent(event) {
    event.stopPropagation();
    this.appSettingsDialog.show();
  }

  private handleAAddCustomTextToTypeIconClickEvent(event) {
    event.stopPropagation();
    this.addCustomTextToTypeDialog.show();
  }

  private onWindowScrollEvent() {
    if (window.scrollY === 0) {
      this.navbar.classList.remove('shadow');
    } else {
      this.navbar.classList.add('shadow');
    }
  }
}
