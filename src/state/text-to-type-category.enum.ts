import { SelectOption } from '../components/_core/select/select.component';

export enum TextToTypeCategory {
  TRAINING = 'TRAINING',
  RANDOM_TEXT = 'RANDOM_TEXT',
  QUOTES = 'QUOTES',
  POEMS = 'POEMS',
  STORIES = 'STORIES',
  CODE = 'CODE',
  CUSTOM_TEXT = 'CUSTOM_TEXT',
}

export const TEXT_TO_TYPE_CATEGORIES: SelectOption<TextToTypeCategory>[] = [
  {
    label: 'Training',
    value: TextToTypeCategory.TRAINING,
  },
  {
    label: 'Random',
    value: TextToTypeCategory.RANDOM_TEXT,
  },
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
    label: 'Source code',
    value: TextToTypeCategory.CODE,
  },
  {
    label: 'Custom Text',
    value: TextToTypeCategory.CUSTOM_TEXT,
  },
];
