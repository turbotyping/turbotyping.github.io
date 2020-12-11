import { PROGRESS_DIV_ID } from '../constants/constant';
import { DELETE_PROGRESS_DATA_EVENT } from '../constants/event.constant';
import { BaseBlockHtmlComponent } from './base/base-block-component';
import { ErrorsProgressHtmlComponent, SpeedProgressHtmlComponent } from './progress.component';

export class ProgressPageHtmlComponent extends BaseBlockHtmlComponent {
  private speedProgress: SpeedProgressHtmlComponent;
  private errorsProgress: ErrorsProgressHtmlComponent;
  private deleteProgressDataButton: HTMLElement;
  private deleteProgressDataButtonId: string;

  __preInsertHtml(): void {
    this.deleteProgressDataButtonId = this.getRandomId();
    this.speedProgress = new SpeedProgressHtmlComponent();
    this.errorsProgress = new ErrorsProgressHtmlComponent();
    this.speedProgress.preInsertHtml();
    this.errorsProgress.preInsertHtml();
  }

  __toHtml(): string {
    return /* html */ `
      <div id="${PROGRESS_DIV_ID}" class="progress-container">
        <button id="${this.deleteProgressDataButtonId}" class="delete-progress-data-button">Delete Progress Data</button>
        <div class="progress-graphs-container">
          <div class="progress-graph">${this.speedProgress.toHtml()}</div>
          <div class="progress-graph">${this.errorsProgress.toHtml()}</div>
        </div>
      </div>
    `;
  }
  __postInsertHtml(): void {
    this.speedProgress.postInsertHtml();
    this.errorsProgress.postInsertHtml();
    this.deleteProgressDataButton = document.getElementById(this.deleteProgressDataButtonId);
    this.deleteProgressDataButton.addEventListener('click', this.handleDeleteProgressDataButtonClickEvent.bind(this));
  }

  private handleDeleteProgressDataButtonClickEvent() {
    const appStorage = this.getAppStorage();
    appStorage.typedTextStats = [];
    appStorage.typedKeysStatsJson = '[]';
    this.saveAppStorage(appStorage);
    this.dispatchCustomEvent(DELETE_PROGRESS_DATA_EVENT);
  }
}
