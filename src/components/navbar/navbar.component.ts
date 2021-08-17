import './navbar.scss';
import { AppSettingsDialogHtmlComponent } from '../app-settings-dialog/app-settings-dialog.component';
import { ChangeThemeIconHtmlComponent } from '../change-theme-icon/change-theme-icon.component';
import { BaseHtmlComponent } from '../_core/base-component';
import { AppStateClient } from '../../state/app-state.client';
import { AddCustomTextToTypeDialogHtmlComponent } from '../add-custom-text-to-type-dialog/add-custom-text-to-type-dialog';
import { SelectHtmlComponent } from '../_core/select/select.component';
import { TextToTypeCategory, TEXT_TO_TYPE_CATEGORIES } from '../../state/text-to-type-category.enum';
import { IAppStateClient } from '../../state/app-state.client.interface';
import { AppState } from '../../state/app-state.model';
import { getTextToTypeLanguage, TextToTypeLanguage } from '../../state/text-to-type-language.enum';
import { APP_SETTINGS_CHANGE_EVENT } from '../../constants/constant';

const APP_SETTINGS_ICON_ID = 'APP_SETTINGS_ICON_ID';
const ADD_CUSTOM_TEXT_TO_TYPE_ICON_ID = 'ADD_CUSTOM_TEXT_TO_TYPE_ICON_ID';

export class NavbarHtmlComponent extends BaseHtmlComponent {
  private navbar: HTMLElement;
  private appSettingsIcon: HTMLElement;
  private appSettingsDialog: AppSettingsDialogHtmlComponent;
  private addCustomTextToTypeIcon: HTMLElement;
  private addCustomTextToTypeDialog: AddCustomTextToTypeDialogHtmlComponent;
  private changeThemeIcon: ChangeThemeIconHtmlComponent;
  private textToTypeCategoriesSelect: SelectHtmlComponent<TextToTypeCategory>;
  private textToTypeLanguagesSelect: SelectHtmlComponent<TextToTypeLanguage>;
  private appState: AppState;
  private textToTypeLanguagesContainerId: string;
  private textToTypeLanguagesContainer: HTMLElement;

  constructor(private appStateClient: IAppStateClient) {
    super();
    this.appState = this.appStateClient.getAppState();
    this.appSettingsDialog = new AppSettingsDialogHtmlComponent(AppStateClient.getInstance());
    this.addCustomTextToTypeDialog = new AddCustomTextToTypeDialogHtmlComponent(AppStateClient.getInstance());
    this.changeThemeIcon = new ChangeThemeIconHtmlComponent(AppStateClient.getInstance());
    this.textToTypeCategoriesSelect = new SelectHtmlComponent<TextToTypeCategory>({
      options: TEXT_TO_TYPE_CATEGORIES,
      selectedOptionValue: this.appState.textToTypeCategory,
    });
    this.textToTypeLanguagesSelect = new SelectHtmlComponent<TextToTypeLanguage>({
      options: getTextToTypeLanguage(this.appState.textToTypeCategory),
      selectedOptionValue: this.appState.textToTypeLanguage,
    });
  }

  preInsertHtml() {
    this.textToTypeLanguagesContainerId = this.generateId();
    this.appSettingsDialog.preInsertHtml();
    this.addCustomTextToTypeDialog.preInsertHtml();
    this.changeThemeIcon.preInsertHtml();
    this.textToTypeCategoriesSelect.preInsertHtml();
    this.textToTypeLanguagesSelect.preInsertHtml();
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
          <span class="select">${this.textToTypeCategoriesSelect.toHtml()}</span>
          <span class="select" id="${this.textToTypeLanguagesContainerId}">${this.textToTypeLanguagesSelect.toHtml()}</span>
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
    this.textToTypeLanguagesContainer = document.getElementById(this.textToTypeLanguagesContainerId);
    this.appSettingsDialog.postInsertHtml();
    this.addCustomTextToTypeDialog.postInsertHtml();
    this.textToTypeCategoriesSelect.postInsertHtml();
    this.textToTypeLanguagesSelect.postInsertHtml();
    this.navbar = document.querySelector('nav');
    this.appSettingsIcon = document.getElementById(APP_SETTINGS_ICON_ID);
    this.appSettingsIcon.addEventListener('click', this.handleAppSettingsIconClickEvent.bind(this));
    this.addCustomTextToTypeIcon = document.getElementById(ADD_CUSTOM_TEXT_TO_TYPE_ICON_ID);
    this.addCustomTextToTypeIcon.addEventListener('click', this.handleAAddCustomTextToTypeIconClickEvent.bind(this));
    window.addEventListener('scroll', this.onWindowScrollEvent.bind(this));
    this.changeThemeIcon.postInsertHtml();
    this.textToTypeCategoriesSelect.onUpdate(this.handleTextToTypeCategoryChangeEvent.bind(this));
    this.textToTypeLanguagesSelect.onUpdate(this.handleTextToTypeLanguageChangeEvent.bind(this));
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

  private handleTextToTypeCategoryChangeEvent(value: TextToTypeCategory) {
    if (value !== this.appState.textToTypeCategory) {
      this.appState.textToTypeIndex = 0;
    }
    this.appState.textToTypeCategory = value;
    if (value == TextToTypeCategory.CODE) {
      this.appState.textToTypeLanguage = TextToTypeLanguage.JAVA;
    } else {
      this.appState.textToTypeLanguage = TextToTypeLanguage.ENGLISH;
    }
    this.textToTypeCategoriesSelect.reset({
      options: TEXT_TO_TYPE_CATEGORIES,
      selectedOptionValue: this.appState.textToTypeCategory,
    });
    this.textToTypeLanguagesSelect.reset({
      options: getTextToTypeLanguage(this.appState.textToTypeCategory),
      selectedOptionValue: this.appState.textToTypeLanguage,
    });
    this.textToTypeLanguagesContainer.classList.remove('hide');
    if (this.appState.textToTypeCategory == TextToTypeCategory.CUSTOM_TEXT || this.appState.textToTypeCategory == TextToTypeCategory.RANDOM_TEXT) {
      this.textToTypeLanguagesContainer.classList.add('hide');
    } else {
      this.textToTypeLanguagesContainer.classList.remove('hide');
    }
    this.saveAppState();
  }

  private handleTextToTypeLanguageChangeEvent(value: TextToTypeLanguage) {
    if (value !== this.appState.textToTypeLanguage) {
      this.appState.textToTypeIndex = 0;
    }
    this.appState.textToTypeLanguage = value;
    this.saveAppState();
  }

  private saveAppState() {
    this.appStateClient.saveAppState(this.appState);
    this.dispatchCustomEvent(APP_SETTINGS_CHANGE_EVENT);
  }
}
