import { BaseHtmlContainer, HtmlComponent } from './component';
import { FirstPageHtmlComponent } from './first-page.component';
import { ProgressContainerHtmlComponent } from './progress-container.component';

export class MainHtmlComponent extends BaseHtmlContainer {
  protected getComponents(): HtmlComponent[] {
    const res: HtmlComponent[] = [];
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
