import { PROGRESS_DIV_ID } from '../constants/constant';
import { BaseBlockHtmlComponent } from './component';
import { ErrorsProgressHtmlComponent, SpeedProgressHtmlComponent } from './progress.component';

export class ProgressPageHtmlComponent extends BaseBlockHtmlComponent {
  private speedProgress: SpeedProgressHtmlComponent;
  private errorsProgress: ErrorsProgressHtmlComponent;

  __preInsertHtml(): void {
    this.speedProgress = new SpeedProgressHtmlComponent();
    this.errorsProgress = new ErrorsProgressHtmlComponent();
    this.speedProgress.preInsertHtml();
    this.errorsProgress.preInsertHtml();
  }

  __toHtml(): string {
    return /* html */ `
      <div id="${PROGRESS_DIV_ID}" class="progress-page">
        <div class="progress-container">${this.speedProgress.toHtml()}</div>
        <div class="progress-container">${this.errorsProgress.toHtml()}</div>
      </div>
    `;
  }
  __postInsertHtml(): void {
    this.speedProgress.postInsertHtml();
    this.errorsProgress.postInsertHtml();
  }
}
