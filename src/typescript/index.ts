import '../sass/index.scss';

import { MainHtmlComponent } from './components/main.component';
import { FooterHtmlComponent } from './components/footer.component';
import { HtmlComponent } from './components/base/component.interface';
import { NavbarHtmlComponent } from './components/navbar.component';

const body = document.querySelector('body');

const components: HtmlComponent[] = [];
components.push(new NavbarHtmlComponent());
components.push(new MainHtmlComponent());
components.push(new FooterHtmlComponent());

components.forEach((component) => component.preInsertHtml());
components.forEach((component) => component.insertHtml(body, 'beforeend'));
components.forEach((component) => component.postInsertHtml());
