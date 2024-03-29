import './ads.scss';
import { BaseAdsHtmlComponent } from './base-ads.component';

export class RightAdsHtmlComponent extends BaseAdsHtmlComponent {
  getAd(): string {
    return this.adsService.getRightAd();
  }
  toHtml(): string {
    return /* html */ `
      <div id="${this.hiddenAdContainerId}" class="vertical-advertise-container hidden-advertise">
      </div>
      <div id="${this.shownAdContainerId}" class="vertical-advertise-container">
      ${this.getAd()}
      </div>
    `;
  }
}
