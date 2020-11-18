import { CheckProgressLinkHtmlComponent } from './check-progress-link.component';
import { BaseBlockHtmlContainer, HtmlComponent } from './component';
import { TextToTypeContainerHtmlComponent } from './text-to-type-container.component';

export class FirstPageHtmlComponent extends BaseBlockHtmlContainer {
  protected __getComponents(): HtmlComponent[] {
    const res: HtmlComponent[] = [];
    res.push(new TextToTypeContainerHtmlComponent());
    res.push(new CheckProgressLinkHtmlComponent());
    return res;
  }
  protected getContainerBeginTag(): string {
    return '<div class="first-page">';
  }
  protected getContainerEndTag(): string {
    return '</div>';
  }
}
