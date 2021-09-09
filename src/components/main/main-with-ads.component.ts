import './main.scss';
import { BaseHtmlComponent } from '../_core/base-component';
import { MainHtmlComponent } from './main.component';
import { LeftAdsHtmlComponent } from '../ads/left-ads.component';
import { RightAdsHtmlComponent } from '../ads/right-ads.component';

export class MainWithAdsHtmlComponent extends BaseHtmlComponent {
  private main: MainHtmlComponent;
  private leftAds: LeftAdsHtmlComponent;
  private rightAds: RightAdsHtmlComponent;

  constructor() {
    super();
    this.main = new MainHtmlComponent();
    this.leftAds = new LeftAdsHtmlComponent();
    this.rightAds = new RightAdsHtmlComponent();
  }

  preInsertHtml(): void {
    this.main.preInsertHtml();
    this.leftAds.postInsertHtml();
    this.rightAds.postInsertHtml();
  }
  toHtml(): string {
    return /* html */ `
      <div class="main-with-ads-container">
        ${this.leftAds.toHtml()}
        ${this.main.toHtml()}
        ${this.rightAds.toHtml()}
      </div>
    `;
  }
  postInsertHtml(): void {
    this.main.postInsertHtml();
    this.leftAds.postInsertHtml();
    this.rightAds.postInsertHtml();
  }
}
