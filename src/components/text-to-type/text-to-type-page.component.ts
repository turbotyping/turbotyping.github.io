import { IHtmlComponent } from '../common/ts/base/base-component.interface';
import { BaseHtmlContainer } from '../common/ts/base/base-container';
import { TypedTextHtmlComponent } from '../typed-text-stats/typed-text-stats.component';
import { TextToTypeReferenceHtmlComponent } from './text-to-type-reference.component';
import { TextToTypeHtmlComponent } from './text-to-type.component';

export class TextToTypePageHtmlComponent extends BaseHtmlContainer {
  getComponents(): IHtmlComponent[] {
    const res = [];
    res.push(new TypedTextHtmlComponent());
    res.push(new TextToTypeHtmlComponent());
    res.push(new TextToTypeReferenceHtmlComponent());
    return res;
  }
  getContainerBeginTag(): string {
    return '<div class="text-to-type-page">';
  }
  getContainerEndTag(): string {
    return '</div>';
  }

  getContainerQuerySelector(): string {
    return '.text-to-type-page';
  }
}
