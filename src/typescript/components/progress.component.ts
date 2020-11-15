import { PROGRESS_DIV_ID } from '../constants/constant';
import { BaseHtmlContainer, HtmlComponent } from './component';
import { ErrorProgressHtmlComponent } from './error-progress.component';
import { SpeedProgressHtmlComponent } from './speed-progress.component';

export class ProgressHtmlComponent extends BaseHtmlContainer {
  protected getComponents(): HtmlComponent[] {
    const res: HtmlComponent[] = [];
    res.push(new SpeedProgressHtmlComponent());
    res.push(new ErrorProgressHtmlComponent());
    return res;
  }

  protected getContainerBeginTag(): string {
    return `<div id="${PROGRESS_DIV_ID}" class="progress-container">`;
  }

  protected getContainerEndTag(): string {
    return '</div>';
  }
}
