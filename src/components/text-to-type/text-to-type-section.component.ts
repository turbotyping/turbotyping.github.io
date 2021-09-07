import { IHtmlComponent } from '../_core/component.interface';
import { TypedTextStatsHtmlComponent } from '../typed-text-stats/typed-text-stats.component';
import { TextToTypeHtmlComponent } from './text-to-type.component';
import { AppStateClient } from '../../state/app-state.client';
import { AzertyTrainingHtmlComponent } from '../training/azerty-training.component';
import { TypedKeysStatsHtmlComponent } from '../typed-text-stats/typed-keys-stats.component';
import { BaseHtmlComponent } from '../_core/base-component';
import { IAppStateClient } from '../../state/app-state.client.interface';
import { TextToTypeCategory } from '../../state/text-to-type-category.enum';
import { APP_SETTINGS_CHANGE_EVENT } from '../../constants/constant';
import { QwertyTrainingHtmlComponent } from '../training/qwerty-training.component';
import { TextToTypeSubCategory } from '../../state/text-to-type-sub-category.enum';

const CONTAINER_ID = 'TextToTypePageHtmlComponentId';

export class TextToTypeSectionHtmlComponent extends BaseHtmlComponent {
  private components: IHtmlComponent[];
  private container: HTMLElement;

  constructor(private appStateClient: IAppStateClient) {
    super();
  }

  preInsertHtml(): void {
    this.components = this.getComponents();
    this.components.forEach((c) => c.preInsertHtml());
  }

  toHtml(): string {
    return /* html */ `
      <div id="${CONTAINER_ID}" class="text-to-type-page">${this.getInnerHtml()}</div>
    `;
  }

  postInsertHtml(): void {
    this.container = document.getElementById(CONTAINER_ID);
    this.components.forEach((c) => c.postInsertHtml());
    this.addCustomEventListener(APP_SETTINGS_CHANGE_EVENT, this.update.bind(this));
  }

  private update() {
    this.components = this.getComponents();
    this.components.forEach((c) => c.preInsertHtml());
    this.container.innerHTML = this.getInnerHtml();
    this.components.forEach((c) => c.postInsertHtml());
  }

  private getComponents(): IHtmlComponent[] {
    const appState = this.appStateClient.getAppState();
    const res = [];
    if (appState.textToTypeCategory == TextToTypeCategory.TRAINING && appState.textToTypeSubCategory == TextToTypeSubCategory.AZERTY_KEYBOARD) {
      res.push(new TypedTextStatsHtmlComponent(AppStateClient.getInstance()));
      res.push(new AzertyTrainingHtmlComponent());
      res.push(new TextToTypeHtmlComponent(AppStateClient.getInstance()));
      return res;
    }
    if (appState.textToTypeCategory == TextToTypeCategory.TRAINING && appState.textToTypeSubCategory == TextToTypeSubCategory.QWERTY_KEYBOARD) {
      res.push(new TypedTextStatsHtmlComponent(AppStateClient.getInstance()));
      res.push(new QwertyTrainingHtmlComponent());
      res.push(new TextToTypeHtmlComponent(AppStateClient.getInstance()));
      return res;
    }
    res.push(new TypedTextStatsHtmlComponent(AppStateClient.getInstance()));
    res.push(new TypedKeysStatsHtmlComponent(AppStateClient.getInstance()));
    res.push(new TextToTypeHtmlComponent(AppStateClient.getInstance()));
    return res;
  }

  getInnerHtml(): string {
    return /* html */ `
      ${this.components.map((c) => c.toHtml()).join('')}
    `;
  }
}
