export class TypedTextStats {
  charsToType: number;
  startTime: Date;
  endTime: Date;
  seconds: number;
  wpm: number;
  errors: number;

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
    this.wpm = Math.round((this.charsToType / 5) / this.getDurationInMin());
    this.seconds = Math.round(this.getDurationInMin() * 60);
  }

  getDurationInMin(): number {
      return ((((+this.endTime - +this.startTime) % 86400000) % 3600000) / 60000);
  }

}