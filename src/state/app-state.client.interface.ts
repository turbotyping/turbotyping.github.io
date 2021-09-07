import { TypedKeyStats } from '../components/typed-keys/typed-key-stats.model';
import { TextToType } from '../components/text-to-type/text-to-type.model';
import { AppState } from './app-state.model';
import { TrainingLesson } from '../components/training/training-lesson.enum';
import { TrainingLessonStats } from '../components/training/training-lesson-stats.model';

export interface IAppStateClient {
  getAppState(): AppState;

  saveAppState(newAppState: AppState): void;

  toTypedKeysStatsJson(typedKeysStatsMap: Map<string, TypedKeyStats[]>): string;

  toTypedKeysStatsMap(typedKeysStatsJson: string): Map<string, TypedKeyStats[]>;

  getTypedKeysStatsMap(): Map<string, TypedKeyStats[]>;

  toTrainingLessonStatsJson(trainingLessonStatsMap: Map<TrainingLesson, TrainingLessonStats[]>): string;

  toTrainingLessonStatsMap(trainingLessonStatsJson: string): Map<TrainingLesson, TrainingLessonStats[]>;

  getTrainingLessonStatsMap(): Map<TrainingLesson, TrainingLessonStats[]>;

  nextTextToTypeIndex(): number;

  previousTextToTypeIndex(): number;

  getTextToTypeArray(): TextToType[];

  getFontSize(): number;

  getTrainingSize(): number;
}
