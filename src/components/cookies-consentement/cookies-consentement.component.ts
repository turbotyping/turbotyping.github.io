import './cookies-consentement.scss';
import { BaseHtmlComponent } from '../_core/base-component';
import { IAppStateClient } from '../../state/app-state.client.interface';
import { AppStateClient } from '../../state/app-state.client';

export class CookiesConsentementHtmlComponent extends BaseHtmlComponent {
  private containerId: string;
  private container: HTMLElement;
  private buttonId: string;
  private button: HTMLElement;

  constructor(private appStateClient: IAppStateClient = AppStateClient.getInstance()) {
    super();
  }

  preInsertHtml(): void {
    this.containerId = this.generateId();
    this.buttonId = this.generateId();
  }

  toHtml() {
    return /* html */ `
      <div id="${this.containerId}" class="cookies-consentement-container">
        <div class="cookies-consentement-left">
          <p class="cookies-consentement-header">
            This website uses cookies
          </p>
          <p class="cookies-consentement-msg">
            This website uses cookies to improve user experience. By using our website you consent to all cookies
            in accordance with our <a href="/cookies-policy.html" target="_blank">Cookies Policy</a>
          </p>
        </div>
        <button id="${this.buttonId}">Accept all</button> 
      </div>
    `;
  }

  postInsertHtml(): void {
    this.container = document.getElementById(this.containerId);
    this.button = document.getElementById(this.buttonId);
    setTimeout(() => {
      const appState = this.appStateClient.getAppState();
      if (!appState.cookiesConsentementAlreadyShown) {
        this.container.classList.add('active');
      }
    }, 2000);
    this.button.addEventListener('click', this.handleButtonClickEvent.bind(this));
  }

  private handleButtonClickEvent() {
    this.container.classList.remove('active');
    const appState = this.appStateClient.getAppState();
    appState.cookiesConsentementAlreadyShown = true;
    this.appStateClient.saveAppState(appState);
  }
}
