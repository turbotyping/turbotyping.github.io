import { PROGRESS_DIV_ID } from '../constants/constant';
import { BaseBlockStaticHtmlComponent } from './component';

export class CheckProgressLinkHtmlComponent extends BaseBlockStaticHtmlComponent {
  __toHtml() {
    return /* html */ `
      <a href="#${PROGRESS_DIV_ID}" class="check-progress-link">Check your progress</a>
    `;
  }
}
