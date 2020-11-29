export interface UserInput<T> {
  onUpdate(callback: (value: T) => void);

  onValidate(validator: (value: T) => void);
}
