import { SelectOption } from './select-option.model';

export enum TextToTypeCategory {
  ENGLISH_QURAN = 'ENGLISH_QURAN',
  FRENCH_QURAN = 'FRENCH_QURAN',
  PROPHET_MOHAMED_PBUH_QUOTES = 'PROPHET_MOHAMED_PBUH_QUOTES',
  COMMON_ENGLISH_QUOTES = 'COMMON_ENGLISH_QUOTES',
}

export const TEXT_TO_TYPE_CATEGORIES: SelectOption<TextToTypeCategory>[] = [
  {
    label: 'Quran (EN)',
    value: TextToTypeCategory.ENGLISH_QURAN,
  },
  {
    label: 'Quran (FR)',
    value: TextToTypeCategory.FRENCH_QURAN,
  },
  {
    label: 'Prophet Mohamed PBUH quotes',
    value: TextToTypeCategory.PROPHET_MOHAMED_PBUH_QUOTES,
  },
  {
    label: 'Common english quotes',
    value: TextToTypeCategory.COMMON_ENGLISH_QUOTES,
  },
];
