export default interface IAdsService {
  get160x600Ads(count: number): string[];
  get728x90Ads(count: number): string[];
}
