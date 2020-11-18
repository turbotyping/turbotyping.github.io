import { BaseBlockStaticHtmlComponent } from './component';

export class FooterHtmlComponent extends BaseBlockStaticHtmlComponent {
  __toHtml() {
    return /* html */ `
      <footer>
        <p>© 2020 enjoytyping.github.io</p>
        <a href="https://github.com/enjoytyping/enjoytyping.github.io" target="_blank">
          <span class="iconify" data-icon="codicon:github-inverted" data-inline="false"></span>
        </a>
      </footer>
    `;
  }
}
