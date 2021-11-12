import './styles/common.scss';

import { FooterHtmlComponent } from './components/footer/footer.component';
import { NavbarHtmlComponent } from './components/navbar/navbar.component';
import { IHtmlComponent } from './components/_core/component.interface';
import { AppStateClient } from './state/app-state.client';
import { TypingProgressPageHtmlComponent } from './components/typing-progress/typing-progress-page.component';
import { FeedbackHtmlComponent } from './components/feedback/feedback.component';

const components: IHtmlComponent[] = [];
components.push(new NavbarHtmlComponent(AppStateClient.getInstance()));
components.push(new TypingProgressPageHtmlComponent(AppStateClient.getInstance()));
components.push(new FeedbackHtmlComponent());
components.push(new FooterHtmlComponent());

components.forEach((component) => component.preInsertHtml());
components.forEach((component) => component.insertHtml(document.body, 'beforeend'));
components.forEach((component) => component.postInsertHtml());
