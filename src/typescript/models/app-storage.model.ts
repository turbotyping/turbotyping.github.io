import { TextToTypeCategory } from './text-to-type-category.enum';
import { TypedTextStats } from './typed-text-stats.model';

export class AppStorage {
  textToTypeCategory: TextToTypeCategory;
  currentTheme: string;
  enableSounds: boolean;
  enableCapitalLetters: boolean;
  enablePunctuationCharacters: boolean;
  stopOnError: boolean;
  textToTypeIndex: number = 0;
  typedTextStats: TypedTextStats[] = [];
}
