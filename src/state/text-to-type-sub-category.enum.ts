import { SelectOption } from '../components/_core/select/select.component';
import { TextToTypeCategory } from './text-to-type-category.enum';

export enum TextToTypeSubCategory {
  ENGLISH = 'ENGLISH',
  FRENCH = 'FRENCH',
  JAVA = 'JAVA',
  PYTHON = 'PYTHON',
  HTML = 'HTML',
  AZERTY_KEYBOARD = 'AZERTY_KEYBOARD',
  QWERTY_KEYBOARD = 'QWERTY_KEYBOARD',
}

export function getTextToTypeSubCategory(category: TextToTypeCategory): SelectOption<TextToTypeSubCategory>[] {
  switch (category) {
    case TextToTypeCategory.TRAINING: {
      return [
        {
          label: 'Azerty keyboard',
          value: TextToTypeSubCategory.AZERTY_KEYBOARD,
        },
        {
          label: 'Qwerty keyboard',
          value: TextToTypeSubCategory.QWERTY_KEYBOARD,
        },
      ];
    }
    case TextToTypeCategory.CODE: {
      return [
        {
          label: 'Java',
          value: TextToTypeSubCategory.JAVA,
        },
        {
          label: 'Python',
          value: TextToTypeSubCategory.PYTHON,
        },
        {
          label: 'HTML',
          value: TextToTypeSubCategory.HTML,
        },
      ];
    }
    case TextToTypeCategory.QUOTES:
    case TextToTypeCategory.POEMS:
    case TextToTypeCategory.STORIES: {
      return [
        {
          label: 'English',
          value: TextToTypeSubCategory.ENGLISH,
        },
        {
          label: 'French',
          value: TextToTypeSubCategory.FRENCH,
        },
      ];
    }
    default: {
      return [];
    }
  }
}
