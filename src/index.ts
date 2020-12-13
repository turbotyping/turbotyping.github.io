import './components/common/scss/common.scss';

import { MainHtmlComponent } from './components/main/main.component';
import { FooterHtmlComponent } from './components/footer/footer.component';
import { NavbarHtmlComponent } from './components/navbar/navbar.component';
import { AppState } from './components/common/ts/base/app-state.model';
import { IHtmlComponent } from './components/common/ts/base/base-component.interface';

const body = document.querySelector('body');

const components: IHtmlComponent[] = [];
components.push(new NavbarHtmlComponent());
components.push(new MainHtmlComponent());
components.push(new FooterHtmlComponent());

components.forEach((component) => component.preInsertHtml());
components.forEach((component) => component.insertHtml(body, 'beforeend'));
components.forEach((component) => component.postInsertHtml());
