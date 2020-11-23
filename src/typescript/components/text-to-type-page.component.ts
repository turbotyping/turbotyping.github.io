import { BaseBlockHtmlContainer } from './base/base-block-container';
import { HtmlComponent } from './base/component.interface';
import { TextToTypeReferenceHtmlComponent } from './text-to-type-reference.component';
import { TextToTypeHtmlComponent } from './text-to-type.component';
import { TypedTextHtmlComponent } from './typed-text-stats.component';

export class TextToTypePageHtmlComponent extends BaseBlockHtmlContainer {
  protected __getComponents(): HtmlComponent[] {
    const res = [];
    res.push(new TypedTextHtmlComponent());
    res.push(new TextToTypeHtmlComponent());
    res.push(new TextToTypeReferenceHtmlComponent());
    return res;
  }
  protected getContainerBeginTag(): string {
    return '<div class="text-to-type-page">';
  }
  protected getContainerEndTag(): string {
    return '</div>';
  }
}
