import '../../styles/common.scss';
import './cookies-and-localstorage-policy.scss';

import { FooterHtmlComponent } from '../../components/footer/footer.component';
import { NavbarHtmlComponent } from '../../components/navbar/navbar.component';
import { IHtmlComponent } from '../../components/_core/component.interface';
import { AppStateClient } from '../../state/app-state.client';
import { FeedbackHtmlComponent } from '../../components/feedback/feedback.component';

const topComponents: IHtmlComponent[] = [];
topComponents.push(new NavbarHtmlComponent(AppStateClient.getInstance()));
topComponents.push(new FeedbackHtmlComponent());
topComponents.forEach((component) => component.preInsertHtml());
topComponents.forEach((component) => component.insertHtml(document.getElementById('top'), 'beforeend'));
topComponents.forEach((component) => component.postInsertHtml());

const bottomComponents: IHtmlComponent[] = [];
bottomComponents.push(new FooterHtmlComponent());
bottomComponents.forEach((component) => component.preInsertHtml());
bottomComponents.forEach((component) => component.insertHtml(document.getElementById('bottom'), 'beforeend'));
bottomComponents.forEach((component) => component.postInsertHtml());
