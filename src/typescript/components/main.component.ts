import { BaseBlockHtmlContainer } from './base/base-block-container';
import { HtmlComponent } from './base/component.interface';
import { ProgressSectionHtmlComponent } from './progress-section.component';
import { TextToTypePageHtmlComponent } from './text-to-type-page.component';

export class MainHtmlComponent extends BaseBlockHtmlContainer {
  protected __getComponents(): HtmlComponent[] {
    const res = [];
    res.push(new TextToTypePageHtmlComponent());
    res.push(new ProgressSectionHtmlComponent());
    return res;
  }

  protected getContainerBeginTag(): string {
    return '<main>';
  }

  protected getContainerEndTag(): string {
    return '</main>';
  }
}
