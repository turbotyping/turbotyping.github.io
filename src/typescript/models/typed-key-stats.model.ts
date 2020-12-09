export class TypedKeyStats {
  wpm: number;
  hitCount: number = 0;
  missCount: number = 0;
  timeToTypeInMs: number = 0;

  increaseHitCount(): void {
    this.hitCount++;
  }

  increaseMissCount(): void {
    this.missCount++;
  }

  increaseTimeToTypeInMs(timeToTypeInMs: number): void {
    this.timeToTypeInMs += timeToTypeInMs;
  }

  updateWpm() {
    this.wpm = Math.floor((((this.hitCount + this.missCount) / (this.timeToTypeInMs / 1000)) * 60) / 5);
  }
}
