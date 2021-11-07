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
        <p>
          Web application that will help you learn <b>Touch Typing</b> (also called <b>Blind Typing</b>)
          which is a style that let you type without using your eyesight to find the keys on the keyboard. 
          Every time you look at the keyboard or make a mistake, you slow down you typing speed. 
          So it would be nice if you could type fast and accurate and this what we will help you do in this website.
        </p>
          
        <h1>How to use keyboard?</h1>
        <p>
          You need to put your fingers on the <b>home row</b>, the one containing the <b>Caps Lock</b> keys. There are small bumps on the 
          <b>F</b> and <b>J</b> keys and you should put your index fingers on the bumps. Each finger is responsible for its own 
          set of keys, as explained in the following illustration:
        </p>
        <img style="margin: 2rem auto 0; display: flex" src="home-keys-position.svg" />

      </div>
    `;
  }

  postInsertHtml(): void {
    // nothing to do
  }
}
