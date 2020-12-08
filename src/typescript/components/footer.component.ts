import { BaseStaticBlockHtmlComponent } from './base/base-static-block-component';

export class FooterHtmlComponent extends BaseStaticBlockHtmlComponent {
  __toHtml() {
    return /* html */ `
      <footer>
        <p>This website was mainly inspired from <a href="https://www.keybr.com/" target="_blank">keybr</a> website
        <p>It lets users type <b>Quotes</b> and <b>Poems</b> while improving their typing skills :)</p>
        <p class="copyright">© 2020 devkeyboard.github.io</p>
      </footer>
    `;
  }
}
