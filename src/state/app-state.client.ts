import { TypedKeyStats } from '../components/typed-keys/typed-key-stats.model';
import { APP_STATE_LOCAL_STORAGE_KEY, FONT_SIZE_DEFAULT_VALUE, TRAINING_SIZE_DEFAULT_VALUE } from '../constants/constant';
import englishQuotes from './quotes.english';
import frenchQuotes from './quotes.french';
import englishPoems from './poems.english';
import frenchPoems from './poems.french';
import englishStories from './stories.english';
import frenchStories from './stories.french';
import javaCode from './code.java';
import pythonCode from './code.python';
import htmlCode from './code.html';
import { TextToTypeCategory } from './text-to-type-category.enum';
import { TextToType } from '../components/text-to-type/text-to-type.model';
import { AppState } from './app-state.model';
import { IAppStateClient } from './app-state.client.interface';
import { TextToTypeSubCategory } from './text-to-type-sub-category.enum';
import { LoremIpsum } from 'lorem-ipsum';
import { TrainingLesson } from '../components/training/training-lesson.enum';
import { TrainingLessonStats } from '../components/training/training-lesson-stats.model';

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 5,
    min: 3,
  },
  wordsPerSentence: {
    max: 12,
    min: 4,
  },
});

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

  toTrainingLessonStatsJson(trainingLessonStatsMap: Map<TrainingLesson, TrainingLessonStats[]>): string {
    return JSON.stringify(Array.from(trainingLessonStatsMap.entries()));
  }

  toTrainingLessonStatsMap(trainingLessonStatsJson: string): Map<TrainingLesson, TrainingLessonStats[]> {
    return new Map(JSON.parse(trainingLessonStatsJson || '[]'));
  }

  getTrainingLessonStatsMap(): Map<TrainingLesson, TrainingLessonStats[]> {
    return new Map(JSON.parse(this.appState.trainingLessonStatsJson || '[]'));
  }

  nextTextToTypeIndex(): number {
    return (this.appState.textToTypeIndex + 1) % this.getTextToTypeArray().length;
  }

  previousTextToTypeIndex(): number {
    return (this.appState.textToTypeIndex - 1 + this.getTextToTypeArray().length) % this.getTextToTypeArray().length;
  }

  getTextToTypeArray(): TextToType[] {
    if (this.appState.textToTypeCategory === TextToTypeCategory.CUSTOM_TEXT) {
      return this.appState.customTextsToType;
    }
    if (
      this.appState.textToTypeCategory === TextToTypeCategory.TRAINING &&
      this.appState.textToTypeSubCategory === TextToTypeSubCategory.AZERTY_KEYBOARD
    ) {
      if (this.appState.trainingLesson === TrainingLesson.KEYS_F_AND_J) {
        return this.generateTrainingTextToType('fj');
      }
      if (this.appState.trainingLesson === TrainingLesson.KEYS_D_AND_K) {
        return this.generateTrainingTextToType('dk');
      }
      if (this.appState.trainingLesson === TrainingLesson.KEYS_FJDK) {
        return this.generateTrainingTextToType('fjdk');
      }
      if (this.appState.trainingLesson === TrainingLesson.KEYS_S_AND_L) {
        return this.generateTrainingTextToType('sl');
      }
      if (this.appState.trainingLesson === TrainingLesson.KEYS_Q_AND_M) {
        return this.generateTrainingTextToType('qm');
      }
      if (this.appState.trainingLesson === TrainingLesson.KEYS_QSLM) {
        return this.generateTrainingTextToType('slqm');
      }
      if (this.appState.trainingLesson === TrainingLesson.KEYS_G_AND_H) {
        return this.generateTrainingTextToType('gh');
      }
      if (this.appState.trainingLesson === TrainingLesson.KEYS_FGHJ) {
        return this.generateTrainingTextToType('fghj');
      }
      if (this.appState.trainingLesson === TrainingLesson.HOME_ROW) {
        return this.generateTrainingTextToType('qsdfghjklm');
      }

      if (this.appState.trainingLesson === TrainingLesson.KEYS_R_AND_U) {
        return this.generateTrainingTextToType('ru');
      }
      if (this.appState.trainingLesson === TrainingLesson.KEYS_E_AND_I) {
        return this.generateTrainingTextToType('ei');
      }
      if (this.appState.trainingLesson === TrainingLesson.KEYS_ERUI) {
        return this.generateTrainingTextToType('ruei');
      }
      if (this.appState.trainingLesson === TrainingLesson.KEYS_Z_AND_O) {
        return this.generateTrainingTextToType('zo');
      }
      if (this.appState.trainingLesson === TrainingLesson.KEYS_A_AND_P) {
        return this.generateTrainingTextToType('ap');
      }
      if (this.appState.trainingLesson === TrainingLesson.KEYS_AZOP) {
        return this.generateTrainingTextToType('azop');
      }
      if (this.appState.trainingLesson === TrainingLesson.KEYS_T_AND_Y) {
        return this.generateTrainingTextToType('ty');
      }
      if (this.appState.trainingLesson === TrainingLesson.KEYS_RTYU) {
        return this.generateTrainingTextToType('rtyu');
      }
      if (this.appState.trainingLesson === TrainingLesson.TOP_ROW) {
        return this.generateTrainingTextToType('azertyuiop');
      }

      if (this.appState.trainingLesson === TrainingLesson.KEYS_V_AND_COMMA) {
        return this.generateTrainingTextToType('v,');
      }
      if (this.appState.trainingLesson === TrainingLesson.KEYS_C_AND_SEMI_COLON) {
        return this.generateTrainingTextToType('c;');
      }
      if (this.appState.trainingLesson === TrainingLesson.KEYS_CV_COMMA_SEMI_COLON) {
        return this.generateTrainingTextToType('cv,;');
      }
      if (this.appState.trainingLesson === TrainingLesson.KEYS_X_AND_COLON) {
        return this.generateTrainingTextToType('x:');
      }
      if (this.appState.trainingLesson === TrainingLesson.KEYS_W_AND_EX) {
        return this.generateTrainingTextToType('w!');
      }
      if (this.appState.trainingLesson === TrainingLesson.KEYS_WX_COLON_EX) {
        return this.generateTrainingTextToType('wx:!');
      }
      if (this.appState.trainingLesson === TrainingLesson.KEYS_B_AND_N) {
        return this.generateTrainingTextToType('bn');
      }
      if (this.appState.trainingLesson === TrainingLesson.KEYS_VBN_COMMA) {
        return this.generateTrainingTextToType('vbn,');
      }
      if (this.appState.trainingLesson === TrainingLesson.BOTTOM_ROW) {
        return this.generateTrainingTextToType('wxcvbn,;:!');
      }
    }

    if (
      this.appState.textToTypeCategory === TextToTypeCategory.TRAINING &&
      this.appState.textToTypeSubCategory === TextToTypeSubCategory.QWERTY_KEYBOARD
    ) {
      if (this.appState.trainingLesson === TrainingLesson.KEYS_F_AND_J) {
        return this.generateTrainingTextToType('fj');
      }
      if (this.appState.trainingLesson === TrainingLesson.KEYS_D_AND_K) {
        return this.generateTrainingTextToType('dk');
      }
      if (this.appState.trainingLesson === TrainingLesson.KEYS_FJDK) {
        return this.generateTrainingTextToType('fjdk');
      }
      if (this.appState.trainingLesson === TrainingLesson.KEYS_S_AND_L) {
        return this.generateTrainingTextToType('sl');
      }
      if (this.appState.trainingLesson === TrainingLesson.KEYS_A_AND_SEMI_COLON) {
        return this.generateTrainingTextToType('a;');
      }
      if (this.appState.trainingLesson === TrainingLesson.KEYS_ASL_SEMI_COLON) {
        return this.generateTrainingTextToType('asl;');
      }
      if (this.appState.trainingLesson === TrainingLesson.KEYS_G_AND_H) {
        return this.generateTrainingTextToType('gh');
      }
      if (this.appState.trainingLesson === TrainingLesson.KEYS_FGHJ) {
        return this.generateTrainingTextToType('fghj');
      }
      if (this.appState.trainingLesson === TrainingLesson.HOME_ROW) {
        return this.generateTrainingTextToType('asdfghjkl;');
      }

      if (this.appState.trainingLesson === TrainingLesson.KEYS_R_AND_U) {
        return this.generateTrainingTextToType('ru');
      }
      if (this.appState.trainingLesson === TrainingLesson.KEYS_E_AND_I) {
        return this.generateTrainingTextToType('ei');
      }
      if (this.appState.trainingLesson === TrainingLesson.KEYS_ERUI) {
        return this.generateTrainingTextToType('ruei');
      }
      if (this.appState.trainingLesson === TrainingLesson.KEYS_W_AND_O) {
        return this.generateTrainingTextToType('wo');
      }
      if (this.appState.trainingLesson === TrainingLesson.KEYS_Q_AND_P) {
        return this.generateTrainingTextToType('qp');
      }
      if (this.appState.trainingLesson === TrainingLesson.KEYS_QWOP) {
        return this.generateTrainingTextToType('qwop');
      }
      if (this.appState.trainingLesson === TrainingLesson.KEYS_T_AND_Y) {
        return this.generateTrainingTextToType('ty');
      }
      if (this.appState.trainingLesson === TrainingLesson.KEYS_RTYU) {
        return this.generateTrainingTextToType('rtyu');
      }
      if (this.appState.trainingLesson === TrainingLesson.TOP_ROW) {
        return this.generateTrainingTextToType('qwertyuiop');
      }

      if (this.appState.trainingLesson === TrainingLesson.KEYS_V_AND_M) {
        return this.generateTrainingTextToType('vm');
      }
      if (this.appState.trainingLesson === TrainingLesson.KEYS_C_AND_COMMA) {
        return this.generateTrainingTextToType('c,');
      }
      if (this.appState.trainingLesson === TrainingLesson.KEYS_CVM_COMMA) {
        return this.generateTrainingTextToType('cvm,');
      }
      if (this.appState.trainingLesson === TrainingLesson.KEYS_X_AND_DOT) {
        return this.generateTrainingTextToType('x.');
      }
      if (this.appState.trainingLesson === TrainingLesson.KEYS_Z_AND_SLASH) {
        return this.generateTrainingTextToType('z/');
      }
      if (this.appState.trainingLesson === TrainingLesson.KEYS_ZX_DOT_SLASH) {
        return this.generateTrainingTextToType('zx./');
      }
      if (this.appState.trainingLesson === TrainingLesson.KEYS_B_AND_N) {
        return this.generateTrainingTextToType('bn');
      }
      if (this.appState.trainingLesson === TrainingLesson.KEYS_VBNM) {
        return this.generateTrainingTextToType('vbnm');
      }
      if (this.appState.trainingLesson === TrainingLesson.BOTTOM_ROW) {
        return this.generateTrainingTextToType('zxcvbnm,');
      }
    }

    if (this.appState.textToTypeCategory === TextToTypeCategory.QUOTES && this.appState.textToTypeSubCategory === TextToTypeSubCategory.ENGLISH) {
      return englishQuotes;
    }
    if (this.appState.textToTypeCategory === TextToTypeCategory.QUOTES && this.appState.textToTypeSubCategory === TextToTypeSubCategory.FRENCH) {
      return frenchQuotes;
    }
    if (this.appState.textToTypeCategory === TextToTypeCategory.POEMS && this.appState.textToTypeSubCategory === TextToTypeSubCategory.ENGLISH) {
      return englishPoems;
    }
    if (this.appState.textToTypeCategory === TextToTypeCategory.POEMS && this.appState.textToTypeSubCategory === TextToTypeSubCategory.FRENCH) {
      return frenchPoems;
    }
    if (this.appState.textToTypeCategory === TextToTypeCategory.STORIES && this.appState.textToTypeSubCategory === TextToTypeSubCategory.ENGLISH) {
      return englishStories;
    }
    if (this.appState.textToTypeCategory === TextToTypeCategory.STORIES && this.appState.textToTypeSubCategory === TextToTypeSubCategory.FRENCH) {
      return frenchStories;
    }
    if (this.appState.textToTypeCategory === TextToTypeCategory.CODE && this.appState.textToTypeSubCategory === TextToTypeSubCategory.JAVA) {
      return javaCode;
    }
    if (this.appState.textToTypeCategory === TextToTypeCategory.CODE && this.appState.textToTypeSubCategory === TextToTypeSubCategory.PYTHON) {
      return pythonCode;
    }
    if (this.appState.textToTypeCategory === TextToTypeCategory.CODE && this.appState.textToTypeSubCategory === TextToTypeSubCategory.HTML) {
      return htmlCode;
    }
    return [
      {
        text: lorem.generateParagraphs(1),
        reference: 'https://www.npmjs.com/package/lorem-ipsum',
        author: 'Lorem Ipsum',
      },
    ];
  }

  getFontSize(): number {
    return this.appState.fontSize || FONT_SIZE_DEFAULT_VALUE;
  }

  getTrainingSize(): number {
    return this.appState.trainingSize || TRAINING_SIZE_DEFAULT_VALUE;
  }

  private generateTrainingTextToType(characters: string) {
    let result = '';
    const length = this.getTrainingSize();
    for (var i = 0; i < length; i++) {
      if (i % 4 == 0) result += ' ';
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return [
      {
        text: result.substring(0, length),
        author: '',
      },
    ];
  }
}
