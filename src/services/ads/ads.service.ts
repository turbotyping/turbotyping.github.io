export default interface IAdsService {
  getRightAd(): string;
  getLeftAd(): string;
  getHorizontalAd(): string;
  getHorizontalAds(count: number): string[];
}
