import { SelectOption } from './select-option.model';

export enum TextToTypeLanguage {
  ENGLISH = 'ENGLISH',
  FRENCH = 'FRENCH',
}

export const TEXT_TO_TYPE_LANGUAGES: SelectOption<TextToTypeLanguage>[] = [
  {
    label: 'English',
    value: TextToTypeLanguage.ENGLISH,
  },
  {
    label: 'French',
    value: TextToTypeLanguage.FRENCH,
  },
];
