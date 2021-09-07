import './styles/common.scss';

import { MainHtmlComponent } from './components/main/main.component';
import { FooterHtmlComponent } from './components/footer/footer.component';
import { NavbarHtmlComponent } from './components/navbar/navbar.component';
import { IHtmlComponent } from './components/_core/component.interface';
import { AppStateClient } from './state/app-state.client';
import { WelcomeMessageDialogHtmlComponent } from './components/welcome-message-dialog/welcome-message-dialog.component';
import { FeedbackHtmlComponent } from './components/feedback/feedback.component';
import { ESCAPE_KEY_CODE } from './constants/constant';
import { MainWithAdsHtmlComponent } from './components/main/main-with-ads.component';
import { CookiesConsentementHtmlComponent } from './components/cookies-consentement/cookies-consentement.component';
import { AddBlockerMessageHtmlComponent } from './components/ads-blocker-message/ads-blocker-message.component';

const components: IHtmlComponent[] = [];
components.push(new WelcomeMessageDialogHtmlComponent(AppStateClient.getInstance()));
components.push(new NavbarHtmlComponent(AppStateClient.getInstance()));
components.push(new MainWithAdsHtmlComponent());
components.push(new FooterHtmlComponent());
components.push(new FeedbackHtmlComponent());
components.push(new CookiesConsentementHtmlComponent());
components.push(new AddBlockerMessageHtmlComponent());

components.forEach((component) => component.preInsertHtml());
components.forEach((component) => component.insertHtml(document.body, 'beforeend'));
components.forEach((component) => component.postInsertHtml());

document.addEventListener('keydown', (event) => {
  if (event.keyCode == ESCAPE_KEY_CODE) {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }
});
