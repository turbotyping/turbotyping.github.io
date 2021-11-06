import './how-we-use-this-application.scss';
import { BaseHtmlComponent } from '../_core/base-component';

export class HowWeUseThisApplicationHtmlComponent extends BaseHtmlComponent {
  preInsertHtml(): void {
    // nothing to do
  }

  toHtml() {
    return /* html */ `
      <div class="how-we-use-this-application-container">
        <h1>Who we are?</h1>
        <p>This website was mainly inspired from <a href="https://keybr.com" target="_blank">keybr</a> website, really great job done by the keybr's team!
        <br/>What we can find in our website, is the ability to write <b>Quotes</b>, <b>Poems</b>, <b>Codes</b>, ... while improving your typing speed & accuracy 🙂
        <br/>For any suggestion, please feel free to create a <a href="https://github.com/turbotyping/turbotyping.github.io/issues/new" target="_blank">ticket</a> in our github repository and we will try to add it ASAP
        </p>
      </div>
    `;
  }

  postInsertHtml(): void {
    // nothing to do
  }
}
