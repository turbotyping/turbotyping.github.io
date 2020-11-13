import { BaseStaticHtmlComponent } from "./component";

export class MainHtmlComponent extends BaseStaticHtmlComponent {
  _toHtml() {
    return /* html */ `
      <main>
        <p>main</p>
      </main>
    `;
  }
}

