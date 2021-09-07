import { BaseHtmlComponent } from '../_core/base-component';
import { IAppStateClient } from '../../state/app-state.client.interface';
import { ToastClient } from '../../services/toast/toast.service';
import { IconHtmlComponent } from '../_core/icon/icon.component';

export class EnableSoundsIconHtmlComponent extends BaseHtmlComponent {
  private enableSoundButtonDomElement: IconHtmlComponent;
  private disableSoundButtonDomElement: IconHtmlComponent;

  constructor(private appStateClient: IAppStateClient, private toastClient: ToastClient = ToastClient.getInstance()) {
    super();
  }

  preInsertHtml(): void {
    const appState = this.appStateClient.getAppState();
    appState.enableSounds = appState.enableSounds || false;
    this.appStateClient.saveAppState(appState);

    this.enableSoundButtonDomElement = new IconHtmlComponent('akar-icons:sound-off', 'Enable Sound');
    this.disableSoundButtonDomElement = new IconHtmlComponent('akar-icons:sound-on', 'Disable Sound');
    this.enableSoundButtonDomElement.preInsertHtml();
    this.disableSoundButtonDomElement.preInsertHtml();
  }

  toHtml() {
    return /* html */ `
      ${this.enableSoundButtonDomElement.toHtml()}
      ${this.disableSoundButtonDomElement.toHtml()}
    `;
  }

  postInsertHtml() {
    this.enableSoundButtonDomElement.postInsertHtml();
    this.disableSoundButtonDomElement.postInsertHtml();
    this.enableSoundButtonDomElement.onClick(this.handleToggleSoundsClickEvent.bind(this));
    this.disableSoundButtonDomElement.onClick(this.handleToggleSoundsClickEvent.bind(this));
    this.updateInnerHTML();
  }

  private updateInnerHTML() {
    this.enableSoundButtonDomElement.hide();
    this.disableSoundButtonDomElement.hide();
    if (this.appStateClient.getAppState().enableSounds) {
      this.disableSoundButtonDomElement.show();
    } else {
      this.enableSoundButtonDomElement.show();
    }
  }

  private handleToggleSoundsClickEvent() {
    const isChrome = /chrome/.test(navigator.userAgent.toLowerCase());
    const isEdge = /edge/.test(navigator.userAgent.toLowerCase());
    const appState = this.appStateClient.getAppState();
    if (!appState.enableSounds && !isChrome && !isEdge) {
      this.toastClient.warn('Sorry, the sound works properly only on Chrome or Edge browsers :(');
      return;
    }
    appState.enableSounds = !appState.enableSounds;
    this.appStateClient.saveAppState(appState);
    this.updateInnerHTML();
    this.enableSoundButtonDomElement.focus();
    this.disableSoundButtonDomElement.focus();
  }
}
