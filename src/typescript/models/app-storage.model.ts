import { TypedTextStats } from './typed-text-stats.model';

export class AppStorage {
  currentTheme: string;
  enableCapitalLetters: boolean;
  enablePunctuationCharacters: boolean;
  textToTypeIndex: number = 0;
  typedTextStats: TypedTextStats[] = [];
}
