import { BaseHtmlContainer, HtmlComponent } from "./component";
import { TextToTypeHtmlComponent } from "./text-to-type.component";
import { TypedTextHtmlComponent } from "./typed-text-stats.component";

export class MainHtmlComponent extends BaseHtmlContainer {

  protected getComponents(): HtmlComponent[] {
    const res: HtmlComponent[] = [];
    res.push(new TypedTextHtmlComponent());
    res.push(new TextToTypeHtmlComponent());
    return res;
  }
  protected getContainerBeginTag(): string {
    return '<main>';
  }
  protected getContainerEndTag(): string {
    return '</main>'
  }
}

