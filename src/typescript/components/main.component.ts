import { BaseBlockHtmlContainer, HtmlComponent } from './component';
import { FirstPageHtmlComponent } from './first-page.component';
import { ProgressContainerHtmlComponent } from './progress.component';

export class MainHtmlComponent extends BaseBlockHtmlContainer {
  protected __getComponents(): HtmlComponent[] {
    const res = [];
    res.push(new FirstPageHtmlComponent());
    res.push(new ProgressContainerHtmlComponent());
    return res;
  }

  protected getContainerBeginTag(): string {
    return '<main>';
  }

  protected getContainerEndTag(): string {
    return '</main>';
  }
}
