export class TypedKeyStats {
  wpm: number = -1;
  hitCount: number = 0;
  missCount: number = 0;
  timeToTypeInMs: number = 0;

  increaseHitCount(timeToTypeInMs: number): void {
    this.timeToTypeInMs += timeToTypeInMs;
    this.hitCount++;
    this.updateWpm();
  }

  increaseMissCount(timeToTypeInMs: number): void {
    this.timeToTypeInMs += timeToTypeInMs;
    this.missCount++;
    this.updateWpm();
  }

  updateWpm() {
    if (this.hitCount > 3) {
      this.wpm = Math.floor((((this.hitCount + this.missCount) / (this.timeToTypeInMs / 1000)) * 60) / 5);
    }
  }
}
