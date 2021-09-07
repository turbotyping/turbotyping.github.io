import { TypedTextStats } from '../typed-text-stats/typed-text-stats.model';

export class TrainingLessonStats {
  public wpm: number;
  public errors: number;

  constructor(typedTextStats: TypedTextStats) {
    this.wpm = typedTextStats.wpm;
    this.errors = typedTextStats.errors;
  }
}
