import { BaseBlockHtmlContainer, HtmlComponent } from './component';
import { TextToTypeContainerHtmlComponent } from './text-to-type-container.component';

export class FirstPageHtmlComponent extends BaseBlockHtmlContainer {
  protected __getComponents(): HtmlComponent[] {
    const res: HtmlComponent[] = [];
    res.push(new TextToTypeContainerHtmlComponent());
    return res;
  }
  protected getContainerBeginTag(): string {
    return '<div class="first-page">';
  }
  protected getContainerEndTag(): string {
    return '</div>';
  }
}
