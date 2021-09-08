import './main.scss';
import { BaseHtmlComponent } from '../_core/base-component';
import { MainHtmlComponent } from './main.component';
import IAdsService from '../../services/ads/ads.service';
import AmazonAdsService from '../../services/ads/amazon-ads.service';

export class MainWithAdsHtmlComponent extends BaseHtmlComponent {
  private main: MainHtmlComponent;
  private leftAdvertiseContainerShownId: string;
  private rightAdvertiseContainerShownId: string;
  private leftAdvertiseContainerHiddenId: string;
  private rightAdvertiseContainerHiddenId: string;
  private leftAdvertiseContainerHidden: HTMLElement;
  private rightAdvertiseContainerHidden: HTMLElement;
  private leftAdvertiseContainerShown: HTMLElement;
  private rightAdvertiseContainerShown: HTMLElement;

  constructor(private adsService: IAdsService = new AmazonAdsService()) {
    super();
    this.main = new MainHtmlComponent();
    this.leftAdvertiseContainerShownId = this.generateId();
    this.rightAdvertiseContainerShownId = this.generateId();
    this.leftAdvertiseContainerHiddenId = this.generateId();
    this.rightAdvertiseContainerHiddenId = this.generateId();
  }

  preInsertHtml(): void {
    this.main.preInsertHtml();
  }
  toHtml(): string {
    const ads = this.adsService.get160x600Ads(2);
    return /* html */ `
      <div class="main-with-ads-container">
        <div id="${this.leftAdvertiseContainerShownId}" class="advertise-container left-advertise-container">
          ${ads[0]}
        </div>
        <div id="${this.leftAdvertiseContainerHiddenId}" class="advertise-container hidden left-advertise-container">
        </div>
        ${this.main.toHtml()}
        <div id="${this.rightAdvertiseContainerHiddenId}" class="advertise-container hidden right-advertise-container">
        </div>
        <div id="${this.rightAdvertiseContainerShownId}" class="advertise-container right-advertise-container">
          ${ads[1]}
        </div>
      </div>
    `;
  }
  postInsertHtml(): void {
    this.main.postInsertHtml();
    this.leftAdvertiseContainerShown = document.getElementById(this.leftAdvertiseContainerShownId);
    this.rightAdvertiseContainerShown = document.getElementById(this.rightAdvertiseContainerShownId);
    this.leftAdvertiseContainerHidden = document.getElementById(this.leftAdvertiseContainerHiddenId);
    this.rightAdvertiseContainerHidden = document.getElementById(this.rightAdvertiseContainerHiddenId);
    setInterval(this.changeAds.bind(this), 20000);
  }

  private changeAds() {
    const ads = this.adsService.get160x600Ads(2);
    this.leftAdvertiseContainerHidden.innerHTML = ads[0];
    this.rightAdvertiseContainerHidden.innerHTML = ads[1];
    const leftFrame = this.leftAdvertiseContainerHidden.querySelector('iframe');
    const rightFrame = this.rightAdvertiseContainerHidden.querySelector('iframe');
    leftFrame.onload = () => {
      this.leftAdvertiseContainerShown.classList.add('hidden');
      this.leftAdvertiseContainerHidden.classList.remove('hidden');
      const tmp = this.leftAdvertiseContainerHidden;
      this.leftAdvertiseContainerHidden = this.leftAdvertiseContainerShown;
      this.leftAdvertiseContainerShown = tmp;
    };
    rightFrame.onload = () => {
      this.rightAdvertiseContainerShown.classList.add('hidden');
      this.rightAdvertiseContainerHidden.classList.remove('hidden');
      const tmp = this.rightAdvertiseContainerHidden;
      this.rightAdvertiseContainerHidden = this.rightAdvertiseContainerShown;
      this.rightAdvertiseContainerShown = tmp;
    };
  }
}
