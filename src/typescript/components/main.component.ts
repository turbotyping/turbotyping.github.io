import { BaseHtmlContainer, HtmlComponent } from "./component";
import { FirstPageHtmlComponent } from "./first-page.component";
import { ProgressHtmlComponent } from "./progress.component";

export class MainHtmlComponent extends BaseHtmlContainer {

  protected getComponents(): HtmlComponent[] {
    const res: HtmlComponent[] = [];
    res.push(new FirstPageHtmlComponent());
    res.push(new ProgressHtmlComponent());
    return res;
  }

  protected getContainerBeginTag(): string {
    return '<main>';
  }
  
  protected getContainerEndTag(): string {
    return '</main>'
  }
}

