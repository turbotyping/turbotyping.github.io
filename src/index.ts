import './styles/common.scss';

import { MainHtmlComponent } from './components/main/main.component';
import { FooterHtmlComponent } from './components/footer/footer.component';
import { NavbarHtmlComponent } from './components/navbar/navbar.component';
import { IHtmlComponent } from './components/_core/component.interface';

const main = document.querySelector('main');

const components: IHtmlComponent[] = [];
components.push(new NavbarHtmlComponent());
components.push(new MainHtmlComponent());
components.push(new FooterHtmlComponent());

components.forEach((component) => component.preInsertHtml());
components.forEach((component) => component.insertHtml(main, 'beforeend'));
components.forEach((component) => component.postInsertHtml());
