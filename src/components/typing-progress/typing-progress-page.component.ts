import './typing-progress.scss';
import { DELETE_PROGRESS_DATA_EVENT } from '../../constants/constant';
import { ErrorProgressTypedKeysHighlighter } from './error-progress-typed-keys-highlighter';
import { TypingProgressHtmlComponent } from './typing-progress.component';
import { BaseHtmlComponent } from '../_core/base-component';
import { SpeedProgressTypedKeysHighlighter } from './speed-progress-typed-keys-highlighter';
import { IAppStateClient } from '../../state/app-state.client.interface';
import { AppStateClient } from '../../state/app-state.client';
import { TYPING_ERROR_GRAPH_BAR_COLOR, TYPING_SPEED_GRAPH_BAR_COLOR } from '../_core/color';

export class TypingProgressPageHtmlComponent extends BaseHtmlComponent {
  private speedProgress: TypingProgressHtmlComponent;
  private errorProgress: TypingProgressHtmlComponent;
  private deleteProgressDataButton: HTMLElement;
  private deleteProgressDataButtonId: string;
  private speedProgressContainerId: string;
  private errorProgressContainerId: string;

  constructor(private appStateClient: IAppStateClient = AppStateClient.getInstance()) {
    super();
  }

  preInsertHtml(): void {
    this.speedProgressContainerId = this.generateId();
    this.errorProgressContainerId = this.generateId();
    this.deleteProgressDataButtonId = this.generateId();
    this.speedProgress = new TypingProgressHtmlComponent(
      AppStateClient.getInstance(),
      'Speed progress',
      (typedTextStats) => typedTextStats.filter((s) => s.wpm > 0).map((s) => s.wpm),
      (typedKeysStats) => typedKeysStats.filter((s) => s.wpm > 0).map((s) => s.wpm),
      new SpeedProgressTypedKeysHighlighter(AppStateClient.getInstance()),
      TYPING_SPEED_GRAPH_BAR_COLOR,
      true
    );
    this.errorProgress = new TypingProgressHtmlComponent(
      AppStateClient.getInstance(),
      'Error progress',
      (typedTextStats) => typedTextStats.map((s) => s.errors),
      (typedKeysStats) => typedKeysStats.map((s) => s.missCount),
      new ErrorProgressTypedKeysHighlighter(AppStateClient.getInstance()),
      TYPING_ERROR_GRAPH_BAR_COLOR,
      false
    );
    this.speedProgress.preInsertHtml();
    this.errorProgress.preInsertHtml();
  }

  toHtml(): string {
    return /* html */ `
      <div class="progress-page-container">
        <div id="${this.speedProgressContainerId}" class="progress-graph">${this.speedProgress.toHtml()}</div>
        <div id="${this.errorProgressContainerId}" class="progress-graph error-progress-graph">${this.errorProgress.toHtml()}</div>
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

  private handleDeleteProgressDataButtonClickEvent() {
    const appState = this.appStateClient.getAppState();
    appState.typedTextsStats = [];
    appState.typedKeysStatsJson = '[]';
    this.appStateClient.saveAppState(appState);
    this.dispatchCustomEvent(DELETE_PROGRESS_DATA_EVENT);
  }
}
