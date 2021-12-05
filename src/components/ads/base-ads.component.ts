import './ads.scss';
import { BaseHtmlComponent } from '../_core/base-component';
import IAdsService from '../../services/ads/ads.service';
import AmazonAdsService from '../../services/ads/amazon-ads.service';
import { AdsUtils } from './AdsUtils';

export abstract class BaseAdsHtmlComponent extends BaseHtmlComponent {
  protected shownAdContainerId: string;
  protected hiddenAdContainerId: string;
  private hiddenAdContainer: HTMLElement;
  private shownAdContainer: HTMLElement;

  constructor(protected adsService: IAdsService = new AmazonAdsService()) {
    super();
    this.shownAdContainerId = this.generateId();
    this.hiddenAdContainerId = this.generateId();
  }

  preInsertHtml(): void {}

  postInsertHtml(): void {
    AdsUtils.onNotBlocked(() => {
      this.shownAdContainer = document.getElementById(this.shownAdContainerId);
      this.hiddenAdContainer = document.getElementById(this.hiddenAdContainerId);
      setInterval(this.changeAds.bind(this), 20000);
    });
  }

  addContainerDiv(): boolean {
    return false;
  }

  private changeAds() {
    this.hiddenAdContainer.innerHTML = this.getAd();
    const iFrame = this.hiddenAdContainer.querySelector('iframe');
    iFrame.onload = () => {
      this.shownAdContainer.classList.add('hidden-advertise');
      this.hiddenAdContainer.classList.remove('hidden-advertise');
      const tmp = this.hiddenAdContainer;
      this.hiddenAdContainer = this.shownAdContainer;
      this.shownAdContainer = tmp;
    };
  }

  abstract getAd(): string;
}
