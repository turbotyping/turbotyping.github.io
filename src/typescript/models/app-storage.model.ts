import { TextToTypeCategory } from './text-to-type-category.enum';
import { TextToTypeLanguage } from './text-to-type-language.enum';
import { TextToType } from './text-to-type.model';
import { TypedTextStats } from './typed-text-stats.model';
import englishQuotes from '../data/quotes.english';
import frenchQuotes from '../data/quotes.french';
import englishPoems from '../data/poems.english';
import frenchPoems from '../data/poems.french';
import englishKidsStories from '../data/kids-stories.english';
import frenchKidsStories from '../data/kids-stories.french';

export class AppStorage {
  textToTypeCategory: TextToTypeCategory;
  textToTypeLanguage: TextToTypeLanguage;
  maxCharactersToType: number;
  currentTheme: string;
  enableSounds: boolean;
  enableCapitalLetters: boolean;
  enablePunctuationCharacters: boolean;
  stopOnError: boolean;
  textToTypeIndex: number = 0;
  typedTextStats: TypedTextStats[] = [];

  static getTextToTypeArray(appStorage: AppStorage): TextToType[] {
    if (appStorage.textToTypeLanguage === TextToTypeLanguage.ENGLISH && appStorage.textToTypeCategory === TextToTypeCategory.QUOTES) {
      return englishQuotes;
    }
    if (appStorage.textToTypeLanguage === TextToTypeLanguage.ENGLISH && appStorage.textToTypeCategory === TextToTypeCategory.POEMS) {
      return englishPoems;
    }
    if (appStorage.textToTypeLanguage === TextToTypeLanguage.ENGLISH && appStorage.textToTypeCategory === TextToTypeCategory.KIDS_STORIES) {
      return englishKidsStories;
    }
    if (appStorage.textToTypeLanguage === TextToTypeLanguage.FRENCH && appStorage.textToTypeCategory === TextToTypeCategory.QUOTES) {
      return frenchQuotes;
    }
    if (appStorage.textToTypeLanguage === TextToTypeLanguage.FRENCH && appStorage.textToTypeCategory === TextToTypeCategory.POEMS) {
      return frenchPoems;
    }
    if (appStorage.textToTypeLanguage === TextToTypeLanguage.FRENCH && appStorage.textToTypeCategory === TextToTypeCategory.KIDS_STORIES) {
      return frenchKidsStories;
    }
    return [];
  }
}
