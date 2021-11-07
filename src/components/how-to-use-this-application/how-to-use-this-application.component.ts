import './how-to-use-this-application.scss';
import { BaseHtmlComponent } from '../_core/base-component';
import { CHANGE_THEME_EVENT, LIGHT_THEME_VALUE } from '../../constants/constant';
import { IAppStateClient } from '../../state/app-state.client.interface';
import { AppStateClient } from '../../state/app-state.client';

export class HowToUseThisApplicationHtmlComponent extends BaseHtmlComponent {
  private keyboardId: string;
  private keyboard: HTMLImageElement;

  constructor(private appStateClient: IAppStateClient = AppStateClient.getInstance()) {
    super();
  }

  preInsertHtml(): void {
    this.keyboardId = this.generateId();
  }

  toHtml() {
    return /* html */ `
      <div class="how-we-use-this-application-container">
        <h1>Who we are?</h1>
        <p>
          Web application that will help you learn <b>Touch Typing</b> (also called <b>Blind Typing</b>)
          which is a style that let you type without using your eyesight to find the keys on the keyboard. 
          Every time you look at the keyboard or make a mistake, you slow down you typing speed. 
          So to be more productive, it would be nice if you could type fast and accurate and this what we 
          will help you do in this website.
        </p>

        <h1>What are our benefits?</h1>
        <p>
          Many apps have been developed to help users improve their typing skills. The difference between 
          <b>Turbo Typing</b> and the other applications is that you can improve your typing skills while 
          writing beautiful <b>Quotes</b> and <b>Poems</b> and if you are a Software Engineer like me, you 
          can write <b>Java</b> or <b>Python</b> source code. 
          Another important feature of the site is the ability to view your typing speed and accuracy and how 
          you have progressed. Each typing test score will be saved and you can see 
          <a href="/progress.html" target="_blank">graphs of your advancement</a>.
        </p>
          
        <h1>How to use your keyboard?</h1>
        <p>
          You need to put your fingers on the <b>Home Row</b>, the one containing the <b>F</b> and <b>J</b> keys. 
          There are small bumps on these keys and you should put your index fingers on the bumps. 
          Each finger is responsible for its own set of keys, as shown in the image bellow:
        </p>
        <img id="${this.keyboardId}" style="margin: 2rem auto 0; display: flex; max-width: 100%" />

        <h1>How to improve your typing speed?</h1>
        <p>
          Typing speed generally improves with practice. While practicing, it is important to ensure that there 
          are no weak keys. Typing speed is typically determined by how slow these weak keys are typed rather 
          than how fast the remaining keys are typed. That's why it is advisable to start by our <b>Training lessons</b>
          to memorize keys position. By default, the <b>Qwerty keyboard</b> is selected and if you are using 
          <b>Azerty keyboard</b>, you can change your preferences to obtain the adequate lessons.
        </p>

        <h1>What is the average typing speed?</h1>
        <p>
          From wikipedia, the majority of people types between 35 and 40 words per minute (WPM) which is equivalent to 190 
          and 200 characters per minute (CPM). However, professional typists type a lot faster exceeding 75 WPM.
        </p>

      </div>
    `;
  }

  postInsertHtml(): void {
    this.keyboard = document.getElementById(this.keyboardId) as HTMLImageElement;
    this.setKeyboardImageSource();
    this.addCustomEventListener(CHANGE_THEME_EVENT, this.setKeyboardImageSource.bind(this));
  }

  private setKeyboardImageSource() {
    const theme = this.appStateClient.getAppState().currentTheme;
    if (theme === LIGHT_THEME_VALUE) {
      this.keyboard.src = 'home-keys-position-light.svg';
    } else {
      this.keyboard.src = 'home-keys-position-dark.svg';
    }
  }
}
