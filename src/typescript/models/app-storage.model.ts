import { TextToTypeCategory } from './text-to-type-category.enum';
import { TextToTypeLanguage } from './text-to-type-language.enum';
import { TextToType } from './text-to-type.model';
import { TypedTextStats } from './typed-text-stats.model';
import englishQuotes from '../data/quotes.english';
import frenchQuotes from '../data/quotes.french';
import englishPoems from '../data/poems.english';
import frenchPoems from '../data/poems.french';
import englishStories from '../data/stories.english';
import frenchStories from '../data/stories.french';
import javaCode from '../data/code.java';
import pythonCode from '../data/code.python';
import htmlCode from '../data/code.html';
import { TypedKeyStats } from './typed-key-stats.model';

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
  typedKeysStatsJson: string;

  get typedKeysStatsMap(): Map<string, TypedKeyStats[]> {
    return new Map(JSON.parse(this.typedKeysStatsJson || '[]'));
  }

  set typedKeysStatsMap(typedKeysStatsMap: Map<string, TypedKeyStats[]>) {
    this.typedKeysStatsJson = JSON.stringify(Array.from(typedKeysStatsMap.entries()));
    console.log(this.typedKeysStatsJson);
  }

  static nextTextToTypeIndex(appStorage: AppStorage) {
    return (appStorage.textToTypeIndex + 1) % AppStorage.getTextToTypeArray(appStorage).length;
  }

  static previousTextToTypeIndex(appStorage: AppStorage) {
    return (appStorage.textToTypeIndex - 1 + AppStorage.getTextToTypeArray(appStorage).length) % AppStorage.getTextToTypeArray(appStorage).length;
  }

  static getTextToTypeArray(appStorage: AppStorage): TextToType[] {
    if (appStorage.textToTypeCategory === TextToTypeCategory.QUOTES && appStorage.textToTypeLanguage === TextToTypeLanguage.ENGLISH) {
      return englishQuotes;
    }
    if (appStorage.textToTypeCategory === TextToTypeCategory.QUOTES && appStorage.textToTypeLanguage === TextToTypeLanguage.FRENCH) {
      return frenchQuotes;
    }
    if (appStorage.textToTypeCategory === TextToTypeCategory.POEMS && appStorage.textToTypeLanguage === TextToTypeLanguage.ENGLISH) {
      return englishPoems;
    }
    if (appStorage.textToTypeCategory === TextToTypeCategory.POEMS && appStorage.textToTypeLanguage === TextToTypeLanguage.FRENCH) {
      return frenchPoems;
    }
    if (appStorage.textToTypeCategory === TextToTypeCategory.STORIES && appStorage.textToTypeLanguage === TextToTypeLanguage.ENGLISH) {
      return englishStories;
    }
    if (appStorage.textToTypeCategory === TextToTypeCategory.STORIES && appStorage.textToTypeLanguage === TextToTypeLanguage.FRENCH) {
      return frenchStories;
    }
    if (appStorage.textToTypeCategory === TextToTypeCategory.CODE && appStorage.textToTypeLanguage === TextToTypeLanguage.JAVA) {
      return javaCode;
    }
    if (appStorage.textToTypeCategory === TextToTypeCategory.CODE && appStorage.textToTypeLanguage === TextToTypeLanguage.PYTHON) {
      return pythonCode;
    }
    if (appStorage.textToTypeCategory === TextToTypeCategory.CODE && appStorage.textToTypeLanguage === TextToTypeLanguage.HTML) {
      return htmlCode;
    }
    return [];
  }
}
