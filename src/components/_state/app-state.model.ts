import { TextToTypeCategory } from './text-to-type-category.enum';
import { TypedTextStats } from '../typed-text-stats/typed-text-stats.model';
import { TextToTypeLanguage } from './text-to-type-language.enum';

export class AppState {
  visitWebsiteForTheFirstTime: boolean = true;
  textToTypeCategory: TextToTypeCategory;
  textToTypeLanguage: TextToTypeLanguage;
  maxCharactersToType: number;
  currentTheme: string;
  enableSounds: boolean;
  enableCapitalLetters: boolean;
  enablePunctuationCharacters: boolean;
  stopOnError: boolean;
  textToTypeIndex: number = 0;
  typedTextsStats: TypedTextStats[] = [];
  typedKeysStatsJson: string;
}
