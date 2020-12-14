import { TypedKeyStats } from '../../../typed-keys/typed-key-stats.model';
import { VISIT_WEBSITE_FOR_THE_FIRST_TIME } from './constant';
import englishQuotes from '../../../../data/quotes.english';
import frenchQuotes from '../../../../data/quotes.french';
import englishPoems from '../../../../data/poems.english';
import frenchPoems from '../../../../data/poems.french';
import englishStories from '../../../../data/stories.english';
import frenchStories from '../../../../data/stories.french';
import javaCode from '../../../../data/code.java';
import pythonCode from '../../../../data/code.python';
import htmlCode from '../../../../data/code.html';
import welcomeMessage from '../../../../data/welcome-message';
import { TextToTypeCategory } from '../../../text-to-type/text-to-type-category.enum';
import { TextToTypeLanguage } from '../../../text-to-type/text-to-type-language.enum';
import { TextToType } from '../../../text-to-type/text-to-type.model';
import { TypedTextStats } from '../../../typed-text-stats/typed-text-stats.model';

export class AppState {
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

  static setTypedKeysStatsJson(appStorage: AppState, typedKeysStatsMap: Map<string, TypedKeyStats[]>): void {
    appStorage.typedKeysStatsJson = JSON.stringify(Array.from(typedKeysStatsMap.entries()));
  }

  static getTypedKeysStatsMap(appStorage: AppState): Map<string, TypedKeyStats[]> {
    return new Map(JSON.parse(appStorage.typedKeysStatsJson || '[]'));
  }

  static nextTextToTypeIndex(appStorage: AppState) {
    return (appStorage.textToTypeIndex + 1) % AppState.getTextToTypeArray(appStorage).length;
  }

  static previousTextToTypeIndex(appStorage: AppState) {
    return (appStorage.textToTypeIndex - 1 + AppState.getTextToTypeArray(appStorage).length) % AppState.getTextToTypeArray(appStorage).length;
  }

  static getTextToTypeArray(appStorage: AppState): TextToType[] {
    if (localStorage.getItem(VISIT_WEBSITE_FOR_THE_FIRST_TIME) === null) {
      return [welcomeMessage];
    }
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
