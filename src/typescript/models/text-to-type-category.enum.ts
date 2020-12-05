import { SelectOption } from './select-option.model';

export enum TextToTypeCategory {
  QUOTES = 'QUOTES',
  POEMS = 'POEMS',
  KIDS_STORIES = 'KIDS_STORIES',
}

export const TEXT_TO_TYPE_CATEGORIES: SelectOption<TextToTypeCategory>[] = [
  {
    label: 'Quotes',
    value: TextToTypeCategory.QUOTES,
  },
  {
    label: 'Poems',
    value: TextToTypeCategory.POEMS,
  },
  {
    label: 'Kids stories',
    value: TextToTypeCategory.KIDS_STORIES,
  },
];
