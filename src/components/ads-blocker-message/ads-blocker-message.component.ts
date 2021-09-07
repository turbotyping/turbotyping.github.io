import './ads-blocker-message.scss';
import { BaseHtmlComponent } from '../_core/base-component';
import { IAppStateClient } from '../../state/app-state.client.interface';
import { AppStateClient } from '../../state/app-state.client';

export class AddBlockerMessageHtmlComponent extends BaseHtmlComponent {
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
      <div id="${this.containerId}" class="ads-blocker-message-container">
        <p class="ads-blocker-message-header">
          Please disable your adblocker to help keep this site running
        </p>
        <p class="ads-blocker-message-body">
          We get it! Ads are annoying but they help keep this website up and running. <br/>
          Please consider disabling your ad block software or whitelist our domain so only our ads are displayed.
        </p>
      </div>
    `;
  }

  postInsertHtml(): void {
    this.container = document.getElementById(this.containerId);
    if (!this.appStateClient.getAppState().cookiesConsentementAlreadyShown) {
      return;
    }
    const googleAdUrl = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    fetch(new Request(googleAdUrl)).catch((_) => {
      setTimeout(() => {
        this.container.classList.add('active');
      }, 5000);
    });
  }
}
