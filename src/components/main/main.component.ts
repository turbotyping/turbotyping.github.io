import './main.scss';
import { IHtmlComponent } from '../_core/component.interface';
import { BaseHtmlContainer } from '../_core/base-container';
import { TextToTypePageHtmlComponent } from '../text-to-type/text-to-type-page.component';
import { AppStateClient } from '../../state/app-state.client';
import { HowToUseThisApplicationHtmlComponent } from '../how-to-use-this-application/how-to-use-this-application.component';

export class MainHtmlComponent extends BaseHtmlContainer {
  getComponents(): IHtmlComponent[] {
    const res = [];
    res.push(new TextToTypePageHtmlComponent(AppStateClient.getInstance()));
    res.push(new HowToUseThisApplicationHtmlComponent());
    return res;
  }

  getContainerBeginTag(): string {
    return '<main>';
  }

  getContainerEndTag(): string {
    return '</main>';
  }

  getContainerQuerySelector(): string {
    return 'main';
  }
}
