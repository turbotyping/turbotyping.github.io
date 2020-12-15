import { TypingProgressSectionHtmlComponent } from '../typing-progress/typing-progress-section.component';
import { IHtmlComponent } from '../_core/base-component.interface';
import { BaseHtmlContainer } from '../_core/base-container';
import { TextToTypePageHtmlComponent } from '../text-to-type/text-to-type-page.component';

export class MainHtmlComponent extends BaseHtmlContainer {
  getComponents(): IHtmlComponent[] {
    const res = [];
    res.push(new TextToTypePageHtmlComponent());
    res.push(new TypingProgressSectionHtmlComponent());
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
