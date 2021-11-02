import './help.scss';
import { BaseHtmlComponent } from '../_core/base-component';

export class HelpHtmlComponent extends BaseHtmlComponent {
  preInsertHtml(): void {}

  toHtml() {
    return /* html */ `
      <div class="help-container"> 
      Help
      </div>
    `;
  }

  postInsertHtml(): void {}
}
