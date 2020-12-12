import { PROGRESS_DIV_ID } from '../constants/constant';
import { DELETE_PROGRESS_DATA_EVENT, END_TYPING_EVENT } from '../constants/event.constant';
import { BaseBlockHtmlComponent } from './base/base-block-component';
import { ProgressHtmlComponent } from './progress.component';

export class ProgressSectionHtmlComponent extends BaseBlockHtmlComponent {
  private speedProgress: ProgressHtmlComponent;
  private errorProgress: ProgressHtmlComponent;
  private deleteProgressDataButton: HTMLElement;
  private deleteProgressDataButtonId: string;

  __preInsertHtml(): void {
    this.deleteProgressDataButtonId = this.getRandomId();
    const appStorage = this.getAppStorage();
    this.speedProgress = new ProgressHtmlComponent(
      'Speed progress',
      appStorage.typedTextStats.map((s) => s.wpm)
    );
    this.errorProgress = new ProgressHtmlComponent(
      'Error progress',
      appStorage.typedTextStats.map((s) => s.errors)
    );
    this.speedProgress.preInsertHtml();
    this.errorProgress.preInsertHtml();
  }

  __toHtml(): string {
    return /* html */ `
      <div id="${PROGRESS_DIV_ID}" class="progress-container">
        <div class="progress-graph">${this.speedProgress.toHtml()}</div>
        <div class="progress-graph">${this.errorProgress.toHtml()}</div>
        <div class="delete-progress-data-button-container">
          <button id="${this.deleteProgressDataButtonId}">Delete Progress Data</button>
        <div>
      </div>
    `;
  }

  __postInsertHtml(): void {
    this.speedProgress.postInsertHtml();
    this.errorProgress.postInsertHtml();
    this.deleteProgressDataButton = document.getElementById(this.deleteProgressDataButtonId);
    this.deleteProgressDataButton.addEventListener('click', this.handleDeleteProgressDataButtonClickEvent.bind(this));
    this.addCustomEventListener(END_TYPING_EVENT, this.updateGraphs.bind(this));
    this.addCustomEventListener(DELETE_PROGRESS_DATA_EVENT, this.updateGraphs.bind(this));
  }

  private updateGraphs() {
    const appStorage = this.getAppStorage();
    this.speedProgress.setGraphData(appStorage.typedTextStats.map((s) => s.wpm));
    this.errorProgress.setGraphData(appStorage.typedTextStats.map((s) => s.errors));
  }

  private handleDeleteProgressDataButtonClickEvent() {
    const appStorage = this.getAppStorage();
    appStorage.typedTextStats = [];
    appStorage.typedKeysStatsJson = '[]';
    this.saveAppStorage(appStorage);
    this.dispatchCustomEvent(DELETE_PROGRESS_DATA_EVENT);
  }
}
