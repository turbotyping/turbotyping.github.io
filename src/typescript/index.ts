import '../sass/index.scss';

import { HtmlComponent } from './components/core/component.interface';
import { NavbarHtmlComponent } from './components/navbar.component';
import { MainHtmlComponent } from './components/main.component';
import { FooterHtmlComponent } from './components/footer.component';

const body = document.querySelector('body');

const components: HtmlComponent[] = [];
components.push(new NavbarHtmlComponent());
components.push(new MainHtmlComponent());
components.push(new FooterHtmlComponent());

components.forEach((component) => component.preInsertHtml());
components.forEach((component) => component.insertHtml(body, 'beforeend'));
components.forEach((component) => component.postInsertHtml());
