import { BaseHtmlContainer, HtmlComponent } from './component';
import { FirstPageHtmlComponent } from './first-page.component';
import { ProgressContainerHtmlComponent } from './progress.component';

export class MainHtmlComponent extends BaseHtmlContainer {
  private components: HtmlComponent[];

  protected getComponents(): HtmlComponent[] {
    if (!this.components) {
      this.components = [];
      this.components.push(new FirstPageHtmlComponent());
      this.components.push(new ProgressContainerHtmlComponent());
      return this.components;
    }
    return this.components;
  }

  protected getContainerBeginTag(): string {
    return '<main>';
  }

  protected getContainerEndTag(): string {
    return '</main>';
  }
}
