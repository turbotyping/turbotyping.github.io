import { SelectOption } from './select-option.model';
import { TextToTypeCategory } from './text-to-type-category.enum';

export enum TextToTypeLanguage {
  ENGLISH = 'ENGLISH',
  FRENCH = 'FRENCH',
  JAVA = 'JAVA',
}

export function getTextToTypeLanguage(category: TextToTypeCategory): SelectOption<TextToTypeLanguage>[] {
  if (category === TextToTypeCategory.CODE) {
    return [
      {
        label: 'Java',
        value: TextToTypeLanguage.JAVA,
      },
    ];
  } else {
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
