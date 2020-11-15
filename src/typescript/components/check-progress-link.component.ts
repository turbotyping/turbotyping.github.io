import { PROGRESS_DIV_ID } from '../constants/constant';
import { BaseStaticHtmlComponent } from './component';

export class CheckProgressLinkHtmlComponent extends BaseStaticHtmlComponent {
  _toHtml() {
    return /* html */ `
      <a href="#${PROGRESS_DIV_ID}" class="check-progress-link">Check your progress</a>
    `;
  }
}
