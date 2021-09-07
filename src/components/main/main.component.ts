import './main.scss';
import { TypingProgressSectionHtmlComponent } from '../typing-progress/typing-progress-section.component';
import { IHtmlComponent } from '../_core/component.interface';
import { BaseHtmlContainer } from '../_core/base-container';
import { TextToTypePageHtmlComponent } from '../text-to-type/text-to-type-page.component';
import { AppStateClient } from '../../state/app-state.client';

export class MainHtmlComponent extends BaseHtmlContainer {
  getComponents(): IHtmlComponent[] {
    const res = [];
    res.push(new TextToTypePageHtmlComponent(AppStateClient.getInstance()));
    res.push(new TypingProgressSectionHtmlComponent(AppStateClient.getInstance()));
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
