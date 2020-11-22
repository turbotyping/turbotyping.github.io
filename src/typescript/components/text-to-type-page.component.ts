import { BaseBlockHtmlContainer } from './core/base-block-container';
import { HtmlComponent } from './core/component.interface';
import { TextToTypeHtmlComponent } from './text-to-type.component';
import { TypedTextHtmlComponent } from './typed-text-stats.component';

export class TextToTypePageHtmlComponent extends BaseBlockHtmlContainer {
  protected __getComponents(): HtmlComponent[] {
    const res = [];
    res.push(new TypedTextHtmlComponent());
    res.push(new TextToTypeHtmlComponent());
    return res;
  }
  protected getContainerBeginTag(): string {
    return '<div class="first-page">';
  }
  protected getContainerEndTag(): string {
    return '</div>';
  }
}
