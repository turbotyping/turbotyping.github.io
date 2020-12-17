import { SelectOption } from '../components/_core/select/select.component';

export enum TextToTypeCategory {
  QUOTES = 'QUOTES',
  POEMS = 'POEMS',
  STORIES = 'STORIES',
  CODE = 'CODE',
  CUSTOM_TEXT = 'CUSTOM_TEXT',
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
  {
    label: 'Custom Text',
    value: TextToTypeCategory.CUSTOM_TEXT,
  },
];
