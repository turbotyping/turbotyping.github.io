import './main.scss';
import { BaseHtmlComponent } from '../_core/base-component';
import { MainHtmlComponent } from './main.component';
import IAdsService from '../../services/ads/ads.service';
import AmazonAdsService from '../../services/ads/amazon-ads.service';
import { END_TYPING_EVENT } from '../../constants/constant';

export class MainWithAdsHtmlComponent extends BaseHtmlComponent {
  private main: MainHtmlComponent;
  private leftAdvertiseContainerId: string;
  private leftAdvertiseContainer: HTMLElement;
  private rightAdvertiseContainerId: string;
  private rightAdvertiseContainer: HTMLElement;

  constructor(private adsService: IAdsService = new AmazonAdsService()) {
    super();
    this.main = new MainHtmlComponent();
    this.leftAdvertiseContainerId = this.generateId();
    this.rightAdvertiseContainerId = this.generateId();
  }

  preInsertHtml(): void {
    this.main.preInsertHtml();
  }
  toHtml(): string {
    const ads = this.adsService.get160x600Ads(2);
    return /* html */ `
      <div class="main-with-ads-container">
        <div id="${this.leftAdvertiseContainerId}" class="advertise-container left-advertise-container">
          ${ads[0]}
        </div>
        ${this.main.toHtml()}
        <div id="${this.rightAdvertiseContainerId}" class="advertise-container right-advertise-container">
          ${ads[1]}
        </div>
      </div>
    `;
  }
  postInsertHtml(): void {
    this.main.postInsertHtml();
    this.leftAdvertiseContainer = document.getElementById(this.leftAdvertiseContainerId);
    this.rightAdvertiseContainer = document.getElementById(this.rightAdvertiseContainerId);
    this.addCustomEventListener(END_TYPING_EVENT, this.handleChangeThemeEvent.bind(this));
  }

  private handleChangeThemeEvent() {
    const ads = this.adsService.get160x600Ads(2);
    this.leftAdvertiseContainer.innerHTML = ads[0];
    this.rightAdvertiseContainer.innerHTML = ads[1];
  }
}
