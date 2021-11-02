import './navbar.scss';
import { AppSettingsSidePanelHtmlComponent } from '../app-settings/app-settings.component';
import { ChangeThemeIconHtmlComponent } from '../change-theme-icon/change-theme-icon.component';
import { BaseHtmlComponent } from '../_core/base-component';
import { AppStateClient } from '../../state/app-state.client';
import { AddCustomTextToTypeSidePanelHtmlComponent } from '../add-custom-text-to-type/add-custom-text-to-type';
import { SelectHtmlComponent } from '../_core/select/select.component';
import { TextToTypeCategory, TEXT_TO_TYPE_CATEGORIES } from '../../state/text-to-type-category.enum';
import { IAppStateClient } from '../../state/app-state.client.interface';
import { getTextToTypeSubCategory, TextToTypeSubCategory } from '../../state/text-to-type-sub-category.enum';
import { APP_SETTINGS_CHANGE_EVENT } from '../../constants/constant';
import { EnableSoundsIconHtmlComponent } from '../enable-sounds-icon/enable-sounds-icon.component';
import { TrainingLesson } from '../training/training-lesson.enum';
import { IconHtmlComponent } from '../_core/icon/icon.component';

export class NavbarHtmlComponent extends BaseHtmlComponent {
  private navbar: HTMLElement;
  private appSettingsIcon: IconHtmlComponent;
  private appSettingsSidePanel: AppSettingsSidePanelHtmlComponent;
  private enableSoundsIcon: EnableSoundsIconHtmlComponent;
  private addCustomTextToTypeIcon: IconHtmlComponent;
  private addCustomTextToTypeSidePanel: AddCustomTextToTypeSidePanelHtmlComponent;
  private changeThemeIcon: ChangeThemeIconHtmlComponent;
  private textToTypeCategoriesSelect: SelectHtmlComponent<TextToTypeCategory>;
  private textToTypeSubCategorySelect: SelectHtmlComponent<TextToTypeSubCategory>;
  private helpIcon: IconHtmlComponent;

  constructor(private appStateClient: IAppStateClient) {
    super();
    const appState = this.appStateClient.getAppState();
    this.appSettingsIcon = new IconHtmlComponent('jam:settings-alt', 'App Settings', '270deg');
    this.addCustomTextToTypeIcon = new IconHtmlComponent('grommet-icons:add', 'Add custom text to type');
    this.appSettingsSidePanel = new AppSettingsSidePanelHtmlComponent(AppStateClient.getInstance());
    this.addCustomTextToTypeSidePanel = new AddCustomTextToTypeSidePanelHtmlComponent(AppStateClient.getInstance());
    this.changeThemeIcon = new ChangeThemeIconHtmlComponent(AppStateClient.getInstance());
    this.textToTypeCategoriesSelect = new SelectHtmlComponent<TextToTypeCategory>({
      options: TEXT_TO_TYPE_CATEGORIES,
      selectedOptionValue: appState.textToTypeCategory,
    });
    this.textToTypeSubCategorySelect = new SelectHtmlComponent<TextToTypeSubCategory>({
      options: getTextToTypeSubCategory(appState.textToTypeCategory),
      selectedOptionValue: appState.textToTypeSubCategory,
    });
    this.enableSoundsIcon = new EnableSoundsIconHtmlComponent(AppStateClient.getInstance());
    this.helpIcon = new IconHtmlComponent('icon-park-outline:help', 'How to use this website ?');
  }

  preInsertHtml() {
    this.appSettingsIcon.preInsertHtml();
    this.addCustomTextToTypeIcon.preInsertHtml();
    this.appSettingsSidePanel.preInsertHtml();
    this.addCustomTextToTypeSidePanel.preInsertHtml();
    this.changeThemeIcon.preInsertHtml();
    this.textToTypeCategoriesSelect.preInsertHtml();
    this.textToTypeSubCategorySelect.preInsertHtml();
    this.enableSoundsIcon.preInsertHtml();
    this.helpIcon.preInsertHtml();
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
          ${this.textToTypeCategoriesSelect.toHtml()}
          ${this.textToTypeSubCategorySelect.toHtml()}
          ${this.enableSoundsIcon.toHtml()}
          ${this.addCustomTextToTypeIcon.toHtml()}
          ${this.appSettingsIcon.toHtml()}
          ${this.appSettingsSidePanel.toHtml()}
          ${this.addCustomTextToTypeSidePanel.toHtml()}
          ${this.changeThemeIcon.toHtml()}
          <a href="/help.html">${this.helpIcon.toHtml()}</a>
        </div>
      </nav>
    `;
  }

  postInsertHtml() {
    this.appSettingsIcon.postInsertHtml();
    this.addCustomTextToTypeIcon.postInsertHtml();
    this.appSettingsSidePanel.postInsertHtml();
    this.addCustomTextToTypeSidePanel.postInsertHtml();
    this.textToTypeCategoriesSelect.postInsertHtml();
    this.textToTypeSubCategorySelect.postInsertHtml();
    this.helpIcon.postInsertHtml();

    this.appSettingsIcon.onClick(this.handleAppSettingsIconClickEvent.bind(this));
    this.addCustomTextToTypeIcon.onClick(this.handleAAddCustomTextToTypeIconClickEvent.bind(this));
    this.navbar = document.querySelector('nav');
    window.addEventListener('scroll', this.onWindowScrollEvent.bind(this));
    this.changeThemeIcon.postInsertHtml();
    this.textToTypeCategoriesSelect.onUpdate(this.handleTextToTypeCategoryChangeEvent.bind(this));
    this.textToTypeSubCategorySelect.onUpdate(this.handleTextToTypeSubCategoryChangeEvent.bind(this));
    this.enableSoundsIcon.postInsertHtml();
    this.addCustomEventListener(APP_SETTINGS_CHANGE_EVENT, this.update.bind(this));
    this.update();
  }

  private handleAppSettingsIconClickEvent() {
    this.appSettingsSidePanel.open();
  }

  private handleAAddCustomTextToTypeIconClickEvent() {
    this.addCustomTextToTypeSidePanel.open();
  }

  private onWindowScrollEvent() {
    if (window.scrollY === 0) {
      this.navbar.classList.remove('shadow');
    } else {
      this.navbar.classList.add('shadow');
    }
  }

  private handleTextToTypeCategoryChangeEvent(value: TextToTypeCategory) {
    const appState = this.appStateClient.getAppState();
    if (value !== appState.textToTypeCategory) {
      appState.textToTypeIndex = 0;
    }
    appState.textToTypeCategory = value;
    this.textToTypeCategoriesSelect.reset({
      options: TEXT_TO_TYPE_CATEGORIES,
      selectedOptionValue: appState.textToTypeCategory,
    });
    const options = getTextToTypeSubCategory(appState.textToTypeCategory);
    this.textToTypeSubCategorySelect.hide();
    if (options.length > 0) {
      const selectedSubCategory = options[0].value;
      appState.textToTypeSubCategory = selectedSubCategory;
      this.textToTypeSubCategorySelect.reset({
        options,
        selectedOptionValue: selectedSubCategory,
      });
      this.textToTypeSubCategorySelect.show();
    }
    if (value == TextToTypeCategory.TRAINING) {
      appState.textToTypeSubCategory = TextToTypeSubCategory.AZERTY_KEYBOARD;
      appState.trainingLesson = TrainingLesson.KEYS_F_AND_J;
    }
    this.saveAppState(appState);
  }

  private handleTextToTypeSubCategoryChangeEvent(value: TextToTypeSubCategory) {
    const appState = this.appStateClient.getAppState();
    if (value !== appState.textToTypeSubCategory) {
      appState.textToTypeIndex = 0;
    }
    appState.textToTypeSubCategory = value;
    if (appState.textToTypeCategory == TextToTypeCategory.TRAINING) {
      appState.trainingLesson = TrainingLesson.KEYS_F_AND_J;
    }
    this.saveAppState(appState);
  }

  private saveAppState(appState) {
    this.appStateClient.saveAppState(appState);
    this.dispatchCustomEvent(APP_SETTINGS_CHANGE_EVENT);
  }

  update() {
    const appState = this.appStateClient.getAppState();
    this.textToTypeCategoriesSelect.reset({
      options: TEXT_TO_TYPE_CATEGORIES,
      selectedOptionValue: appState.textToTypeCategory,
    });
    const options = getTextToTypeSubCategory(appState.textToTypeCategory);
    this.textToTypeSubCategorySelect.reset({
      options,
      selectedOptionValue: appState.textToTypeSubCategory,
    });
    this.textToTypeSubCategorySelect.show();
  }
}
