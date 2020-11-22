export class SelectOption<T> {
  label: String;
  value: T;
}

export class StringSelectOption extends SelectOption<String> {}
