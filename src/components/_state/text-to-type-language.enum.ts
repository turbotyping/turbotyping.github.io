import { SelectOption } from '../_core/select/select.component';
import { TextToTypeCategory } from './text-to-type-category.enum';

export enum TextToTypeLanguage {
  ENGLISH = 'english',
  FRENCH = 'french',
  JAVA = 'java',
  PYTHON = 'python',
  HTML = 'html',
}

export function getTextToTypeLanguage(category: TextToTypeCategory): SelectOption<TextToTypeLanguage>[] {
  switch (category) {
    case TextToTypeCategory.CODE: {
      return [
        {
          label: 'Java',
          value: TextToTypeLanguage.JAVA,
        },
        {
          label: 'Python',
          value: TextToTypeLanguage.PYTHON,
        },
        {
          label: 'HTML',
          value: TextToTypeLanguage.HTML,
        },
      ];
    }
    case TextToTypeCategory.CUSTOM_TEXT: {
      return [];
    }
    default: {
      return [
        {
          label: 'English',
          value: TextToTypeLanguage.ENGLISH,
        },
        {
          label: 'French',
          value: TextToTypeLanguage.FRENCH,
        },
      ];
    }
  }
}
