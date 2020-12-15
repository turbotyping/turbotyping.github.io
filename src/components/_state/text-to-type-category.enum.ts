import { SelectOption } from '../_core/select/select.component';

export enum TextToTypeCategory {
  QUOTES = 'QUOTES',
  POEMS = 'POEMS',
  STORIES = 'STORIES',
  CODE = 'CODE',
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
    label: 'Stories',
    value: TextToTypeCategory.STORIES,
  },
  {
    label: 'Code',
    value: TextToTypeCategory.CODE,
  },
];
