import { TextToTypeCategory } from './text-to-type-category.enum';
import { TypedTextStats } from '../components/typed-text-stats/typed-text-stats.model';
import { TextToTypeLanguage } from './text-to-type-language.enum';
import { TextToType } from '../components/text-to-type/text-to-type.model';

export class AppState {
  customTextsToType: TextToType[];
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
