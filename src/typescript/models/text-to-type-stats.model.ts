export class TextToTypeStats {
  charsToType: number;
  startTime: Date;
  endTime: Date;
  errors: number;
  wpm: number;

  constructor(charsToType: number) {
    this.charsToType = charsToType;
    this.errors = 0;
  }

  handleKeyDownEvent(): void {
    if (this.startTime) return;
    this.startTime = new Date();
  }

  increaseErrors(): void {
    this.errors++;
  }

  endType(): void {
    this.endTime = new Date();
    this.wpm = (this.charsToType / 5) / this.getDurationInMin();
  }

  getDurationInMin(): number {
      return ((((+this.endTime - +this.startTime) % 86400000) % 3600000) / 60000)
  }
}