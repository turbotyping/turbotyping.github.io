import './ads.scss';
import { BaseAdsHtmlComponent } from './base-ads.component';

export class LeftAdsHtmlComponent extends BaseAdsHtmlComponent {
  getAd(): string {
    return this.adsService.getLeftAd();
  }
  toHtml(): string {
    return /* html */ `
      <div id="${this.shownAdContainerId}" class="vertical-advertise-container">
        ${this.getAd()}
      </div>
      <div id="${this.hiddenAdContainerId}" class="vertical-advertise-container hidden-advertise">
      </div>
    `;
  }
}
