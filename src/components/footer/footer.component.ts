import './footer.scss';
import { BaseHtmlComponent } from '../_core/base-component';

export class FooterHtmlComponent extends BaseHtmlComponent {
  preInsertHtml(): void {
    // nothing to do
  }

  toHtml() {
    return /* html */ `
      <footer>
        <p>© 2020 turbotyping.github.io</p>
      </footer>
    `;
  }

  postInsertHtml(): void {
    // nothing to do
  }
}
