import './styles/common.scss';
import './styles/index.scss';

import { FooterHtmlComponent } from './components/footer/footer.component';
import { NavbarHtmlComponent } from './components/navbar/navbar.component';
import { IHtmlComponent } from './components/_core/component.interface';
import { AppStateClient } from './state/app-state.client';
import { WelcomeMessageDialogHtmlComponent } from './components/welcome-message-dialog/welcome-message-dialog.component';
import { CookiesConsentementHtmlComponent } from './components/cookies-and-localstorage-policy/cookies-and-localstorage-policy-consentement.component';
import { AddBlockerMessageHtmlComponent } from './components/ads/ads-blocker-message.component';
import { FeedbackHtmlComponent } from './components/feedback/feedback.component';
import { TextToTypeToolHtmlComponent } from './components/text-to-type/text-to-type-tool.component';
import { LeftAdsHtmlComponent } from './components/ads/left-ads.component';
import { RightAdsHtmlComponent } from './components/ads/right-ads.component';
import { KeyboardUtils } from './utils/keyboard-utils';

const topComponents: IHtmlComponent[] = [];
topComponents.push(new WelcomeMessageDialogHtmlComponent(AppStateClient.getInstance()));
topComponents.push(new NavbarHtmlComponent(AppStateClient.getInstance()));
topComponents.push(new FeedbackHtmlComponent());
topComponents.push(new CookiesConsentementHtmlComponent());
topComponents.push(new AddBlockerMessageHtmlComponent());
topComponents.forEach((component) => component.preInsertHtml());
topComponents.forEach((component) => component.insertHtml(document.getElementById('top'), 'beforeend'));
topComponents.forEach((component) => component.postInsertHtml());

const textToTypeToolComponent = new TextToTypeToolHtmlComponent(AppStateClient.getInstance());
textToTypeToolComponent.preInsertHtml();
textToTypeToolComponent.insertHtml(document.getElementById('textToTypeTool'), 'beforeend');
textToTypeToolComponent.postInsertHtml();

// const leftAdsComponent = new LeftAdsHtmlComponent();
// leftAdsComponent.preInsertHtml();
// leftAdsComponent.insertHtml(document.getElementById('leftAds'), 'beforeend');
// leftAdsComponent.postInsertHtml();

// const rightAdsComponent = new RightAdsHtmlComponent();
// rightAdsComponent.preInsertHtml();
// rightAdsComponent.insertHtml(document.getElementById('rightAds'), 'beforeend');
// rightAdsComponent.postInsertHtml();

const bottomComponents: IHtmlComponent[] = [];
bottomComponents.push(new FooterHtmlComponent());
bottomComponents.forEach((component) => component.preInsertHtml());
bottomComponents.forEach((component) => component.insertHtml(document.getElementById('bottom'), 'beforeend'));
bottomComponents.forEach((component) => component.postInsertHtml());

KeyboardUtils.blurActiveElementOnEscapeKeydownEvent();
document.getElementById('description').classList.remove('hidden');
