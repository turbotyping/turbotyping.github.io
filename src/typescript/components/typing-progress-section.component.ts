import { DELETE_PROGRESS_DATA_EVENT, PROGRESS_DIV_ID } from '../constants/constant';
import { BaseBlockHtmlComponent } from './base/base-block-component';
import { ErrorProgressTypedKeysHighlighter } from '../services/error-progress-typed-keys-highlighter';
import { SpeedProgressTypedKeysHighlighter } from '../services/speed-progress-typed-keys-highlighter';
import { TypingProgressHtmlComponent } from './typing-progress.component';

export class TypingProgressSectionHtmlComponent extends BaseBlockHtmlComponent {
  private speedProgress: TypingProgressHtmlComponent;
  private errorProgress: TypingProgressHtmlComponent;
  private deleteProgressDataButton: HTMLElement;
  private deleteProgressDataButtonId: string;
  private speedProgressContainerId: string;
  private errorProgressContainerId: string;

  __preInsertHtml(): void {
    this.speedProgressContainerId = this.getRandomId();
    this.errorProgressContainerId = this.getRandomId();
    this.deleteProgressDataButtonId = this.getRandomId();
    this.speedProgress = new TypingProgressHtmlComponent(
      'Speed progress',
      (typedTextStats) => typedTextStats.filter((s) => s.wpm > 0).map((s) => s.wpm),
      (typedKeysStats) => typedKeysStats.filter((s) => s.wpm > 0).map((s) => s.wpm),
      new SpeedProgressTypedKeysHighlighter()
    );
    this.errorProgress = new TypingProgressHtmlComponent(
      'Error progress',
      (typedTextStats) => typedTextStats.map((s) => s.errors),
      (typedKeysStats) => typedKeysStats.map((s) => s.missCount),
      new ErrorProgressTypedKeysHighlighter()
    );
    this.speedProgress.preInsertHtml();
    this.errorProgress.preInsertHtml();
  }

  __toHtml(): string {
    return /* html */ `
      <div id="${PROGRESS_DIV_ID}" class="progress-container">
        <div id="${this.speedProgressContainerId}" class="progress-graph">${this.speedProgress.toHtml()}</div>
        <div id="${this.errorProgressContainerId}" class="progress-graph">${this.errorProgress.toHtml()}</div>
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
  }

  private handleDeleteProgressDataButtonClickEvent() {
    const appStorage = this.getAppStorage();
    appStorage.typedTextsStats = [];
    appStorage.typedKeysStatsJson = '[]';
    this.saveAppStorage(appStorage);
    this.dispatchCustomEvent(DELETE_PROGRESS_DATA_EVENT);
  }
}
