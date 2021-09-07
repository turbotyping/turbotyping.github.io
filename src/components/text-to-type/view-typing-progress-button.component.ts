import { PROGRESS_DIV_ID } from '../../constants/constant';
import { BaseHtmlComponent } from '../_core/base-component';
import { IAppStateClient } from '../../state/app-state.client.interface';

export class ViewTypingProgressButtonHtmlComponent extends BaseHtmlComponent {
  constructor(private appStateClient: IAppStateClient) {
    super();
  }

  preInsertHtml(): void {}

  toHtml(): string {
    return /* html */ `
    <span class="view-typing-progress-button-container">
      <a class="view-typing-progress-button" href="#${PROGRESS_DIV_ID}">
        View typing progress
      </a>
    </span>
    `;
  }
  postInsertHtml(): void {}
}
