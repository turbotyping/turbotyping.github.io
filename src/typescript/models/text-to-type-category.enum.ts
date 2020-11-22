import { SelectOption } from './select-option.model';

export enum TextToTypeCategory {
  PROPHET_MOHAMED_PBUH_QUOTES = 'PROPHET_MOHAMED_PBUH_QUOTES',
  COMMON_ENGLISH_QUOTES = 'COMMON_ENGLISH_QUOTES',
}

export const TEXT_TO_TYPE_CATEGORIES: SelectOption<TextToTypeCategory>[] = [
  {
    label: 'Prophet Mohamed PBUH quotes',
    value: TextToTypeCategory.PROPHET_MOHAMED_PBUH_QUOTES,
  },
  {
    label: 'Common english quotes',
    value: TextToTypeCategory.COMMON_ENGLISH_QUOTES,
  },
];
