import './typing-progress.scss';
import { DELETE_PROGRESS_DATA_EVENT, PROGRESS_DIV_ID } from '../../constants/constant';
import { ErrorProgressTypedKeysHighlighter } from './error-progress-typed-keys-highlighter';
import { TypingProgressHtmlComponent } from './typing-progress.component';
import { BaseHtmlComponent } from '../common/ts/base/base-component';
import { SpeedProgressTypedKeysHighlighter } from './speed-progress-typed-keys-highlighter';

export class TypingProgressSectionHtmlComponent extends BaseHtmlComponent {
  private speedProgress: TypingProgressHtmlComponent;
  private errorProgress: TypingProgressHtmlComponent;
  private deleteProgressDataButton: HTMLElement;
  private deleteProgressDataButtonId: string;
  private speedProgressContainerId: string;
  private errorProgressContainerId: string;

  preInsertHtml(): void {
    this.speedProgressContainerId = this.generateId();
    this.errorProgressContainerId = this.generateId();
    this.deleteProgressDataButtonId = this.generateId();
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

  toHtml(): string {
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

  postInsertHtml(): void {
    this.speedProgress.postInsertHtml();
    this.errorProgress.postInsertHtml();
    this.deleteProgressDataButton = document.getElementById(this.deleteProgressDataButtonId);
    this.deleteProgressDataButton.addEventListener('click', this.handleDeleteProgressDataButtonClickEvent.bind(this));
  }

  getContainerQuerySelector(): string {
    return `#${PROGRESS_DIV_ID}`;
  }

  private handleDeleteProgressDataButtonClickEvent() {
    const appStorage = this.getAppState();
    appStorage.typedTextsStats = [];
    appStorage.typedKeysStatsJson = '[]';
    this.saveAppState(appStorage);
    this.dispatchCustomEvent(DELETE_PROGRESS_DATA_EVENT);
  }
}
