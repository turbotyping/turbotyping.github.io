import { BaseBlockHtmlContainer, HtmlComponent } from './component';
import { ProgressPageHtmlComponent } from './progress-page.component';
import { TextToTypePageHtmlComponent } from './text-to-type-page.component';

export class MainHtmlComponent extends BaseBlockHtmlContainer {
  protected __getComponents(): HtmlComponent[] {
    const res = [];
    res.push(new TextToTypePageHtmlComponent());
    res.push(new ProgressPageHtmlComponent());
    return res;
  }

  protected getContainerBeginTag(): string {
    return '<main>';
  }

  protected getContainerEndTag(): string {
    return '</main>';
  }
}
