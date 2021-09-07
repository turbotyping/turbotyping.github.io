import { TextToTypeCategory } from './text-to-type-category.enum';
import { TypedTextStats } from '../components/typed-text-stats/typed-text-stats.model';
import { TextToTypeSubCategory } from './text-to-type-sub-category.enum';
import { TextToType } from '../components/text-to-type/text-to-type.model';
import { TrainingLesson } from '../components/training/training-lesson.enum';
import { TRAINING_SIZE_DEFAULT_VALUE } from '../constants/constant';

export class AppState {
  customTextsToType: TextToType[];
  visitWebsiteForTheFirstTime: boolean = true;
  textToTypeCategory: TextToTypeCategory = TextToTypeCategory.TRAINING;
  textToTypeSubCategory: TextToTypeSubCategory = TextToTypeSubCategory.QWERTY_KEYBOARD;
  currentTheme: string;
  enableSounds: boolean;
  enableCapitalLetters: boolean;
  enablePunctuationCharacters: boolean;
  stopOnError: boolean;
  textToTypeIndex: number = 0;
  typedTextsStats: TypedTextStats[] = [];
  typedKeysStatsJson: string;
  trainingLessonStatsJson: string = '';
  fontSize: number = 22;
  trainingSize: number = TRAINING_SIZE_DEFAULT_VALUE;
  trainingLesson = TrainingLesson.KEYS_F_AND_J;
  cookiesConsentementAlreadyShown = false;
}
