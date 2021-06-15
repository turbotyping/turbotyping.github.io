import { TypedKeyStats } from '../components/typed-keys/typed-key-stats.model';
import { APP_STATE_LOCAL_STORAGE_KEY } from '../constants/constant';
import englishQuotes from './quotes.english';
import frenchQuotes from './quotes.french';
import englishPoems from './poems.english';
import frenchPoems from './poems.french';
import englishStories from './stories.english';
import frenchStories from './stories.french';
import javaCode from './code.java';
import pythonCode from './code.python';
import htmlCode from './code.html';
import welcomeMessage from './welcome-message';
import { TextToTypeCategory } from './text-to-type-category.enum';
import { TextToType } from '../components/text-to-type/text-to-type.model';
import { AppState } from './app-state.model';
import { IAppStateClient } from './app-state.client.interface';
import { TextToTypeLanguage } from './text-to-type-language.enum';

export class AppStateClient implements IAppStateClient {
  private static instance: AppStateClient = null;
  private appState: AppState = null;

  static getInstance(): AppStateClient {
    if (AppStateClient.instance === null) {
      AppStateClient.instance = new AppStateClient();
    }
    return AppStateClient.instance;
  }

  private constructor() {}

  getAppState(): AppState {
    if (!this.appState) {
      this.appState = JSON.parse(localStorage.getItem(APP_STATE_LOCAL_STORAGE_KEY)) || new AppState();
    }
    return JSON.parse(JSON.stringify(this.appState));
  }

  saveAppState(newAppState: AppState): void {
    this.appState = newAppState;
    localStorage.setItem(APP_STATE_LOCAL_STORAGE_KEY, JSON.stringify(newAppState));
  }

  toTypedKeysStatsJson(typedKeysStatsMap: Map<string, TypedKeyStats[]>): string {
    return JSON.stringify(Array.from(typedKeysStatsMap.entries()));
  }

  toTypedKeysStatsMap(typedKeysStatsJson: string): Map<string, TypedKeyStats[]> {
    return new Map(JSON.parse(typedKeysStatsJson || '[]'));
  }

  getTypedKeysStatsMap(): Map<string, TypedKeyStats[]> {
    return new Map(JSON.parse(this.appState.typedKeysStatsJson || '[]'));
  }

  nextTextToTypeIndex(): number {
    return (this.appState.textToTypeIndex + 1) % this.getTextToTypeArray().length;
  }

  previousTextToTypeIndex(): number {
    return (this.appState.textToTypeIndex - 1 + this.getTextToTypeArray().length) % this.getTextToTypeArray().length;
  }

  getTextToTypeArray(): TextToType[] {
    if (this.appState.visitWebsiteForTheFirstTime) {
      this.appState.visitWebsiteForTheFirstTime = false;
      this.saveAppState(this.appState);
      return [welcomeMessage];
    }
    if (this.appState.textToTypeCategory === TextToTypeCategory.CUSTOM_TEXT) {
      return this.appState.customTextsToType;
    }
    if (this.appState.textToTypeCategory === TextToTypeCategory.QUOTES && this.appState.textToTypeLanguage === TextToTypeLanguage.ENGLISH) {
      return englishQuotes;
    }
    if (this.appState.textToTypeCategory === TextToTypeCategory.QUOTES && this.appState.textToTypeLanguage === TextToTypeLanguage.FRENCH) {
      return frenchQuotes;
    }
    if (this.appState.textToTypeCategory === TextToTypeCategory.POEMS && this.appState.textToTypeLanguage === TextToTypeLanguage.ENGLISH) {
      return englishPoems;
    }
    if (this.appState.textToTypeCategory === TextToTypeCategory.POEMS && this.appState.textToTypeLanguage === TextToTypeLanguage.FRENCH) {
      return frenchPoems;
    }
    if (this.appState.textToTypeCategory === TextToTypeCategory.STORIES && this.appState.textToTypeLanguage === TextToTypeLanguage.ENGLISH) {
      return englishStories;
    }
    if (this.appState.textToTypeCategory === TextToTypeCategory.STORIES && this.appState.textToTypeLanguage === TextToTypeLanguage.FRENCH) {
      return frenchStories;
    }
    if (this.appState.textToTypeCategory === TextToTypeCategory.CODE && this.appState.textToTypeLanguage === TextToTypeLanguage.JAVA) {
      return javaCode;
    }
    if (this.appState.textToTypeCategory === TextToTypeCategory.CODE && this.appState.textToTypeLanguage === TextToTypeLanguage.PYTHON) {
      return pythonCode;
    }
    if (this.appState.textToTypeCategory === TextToTypeCategory.CODE && this.appState.textToTypeLanguage === TextToTypeLanguage.HTML) {
      return htmlCode;
    }
    return [];
  }
}
