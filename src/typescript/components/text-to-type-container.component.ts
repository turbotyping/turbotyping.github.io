import { BaseHtmlContainer, HtmlComponent } from './component';
import { TextToTypeHtmlComponent } from './text-to-type.component';
import { TypedTextHtmlComponent } from './typed-text-stats.component';

export class TextToTypeContainerHtmlComponent extends BaseHtmlContainer {
  private components: HtmlComponent[];

  protected getComponents(): HtmlComponent[] {
    if (!this.components) {
      this.components = [];
      this.components.push(new TypedTextHtmlComponent());
      this.components.push(new TextToTypeHtmlComponent());
    }
    return this.components;
  }
  protected getContainerBeginTag(): string {
    return '<div>';
  }
  protected getContainerEndTag(): string {
    return '</div>';
  }
}
