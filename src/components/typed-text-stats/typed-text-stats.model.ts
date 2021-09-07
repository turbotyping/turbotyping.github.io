import { TypedKeyStats } from '../typed-keys/typed-key-stats.model';

export class TypedTextStats {
  charsToType: number;
  startTime: Date;
  endTime: Date;
  seconds: number;
  wpm: number;
  errors: number;
  lastTypedCharTime: Date;
  typedKeyStatsMap: Map<string, TypedKeyStats> = new Map<string, TypedKeyStats>();

  constructor(charsToType: number) {
    this.charsToType = charsToType;
    this.errors = 0;
  }

  handleKeyDownEvent(typedKey: string, expectedKeyRegex: RegExp): void {
    if (this.startTime) {
      const timeToTypeInMs = new Date().getTime() - this.lastTypedCharTime.getTime();
      let typedKeyStats = this.typedKeyStatsMap.get(typedKey);
      if (!typedKeyStats) {
        typedKeyStats = new TypedKeyStats();
        this.typedKeyStatsMap.set(typedKey, typedKeyStats);
      }
      if (expectedKeyRegex.test(typedKey)) {
        typedKeyStats.increaseHitCount(timeToTypeInMs);
      } else {
        typedKeyStats.increaseMissCount(timeToTypeInMs);
      }
      this.lastTypedCharTime = new Date();
      return;
    }
    this.startTime = new Date();
    this.lastTypedCharTime = new Date();
  }

  increaseErrors(): void {
    this.errors++;
  }

  decreaseErrors(): void {
    this.errors--;
  }

  endType(): Map<string, TypedKeyStats> {
    this.endTime = new Date();
    this.wpm = Math.round(this.charsToType / 5 / this.getDurationInMin());
    this.seconds = Math.round(this.getDurationInMin() * 60);
    return this.typedKeyStatsMap;
  }

  getDurationInMin(): number {
    return (((+this.endTime - +this.startTime) % 86400000) % 3600000) / 60000;
  }
}
