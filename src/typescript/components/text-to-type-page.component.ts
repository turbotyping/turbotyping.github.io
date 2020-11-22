import { BaseBlockHtmlContainer } from './base/base-block-container';
import { HtmlComponent } from './base/component.interface';
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
    return '<div class="text-to-type-page">';
  }
  protected getContainerEndTag(): string {
    return '</div>';
  }
}
