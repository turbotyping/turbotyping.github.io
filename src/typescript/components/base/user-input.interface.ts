export interface UserInput<T> {
  onUpdate(callback: (value: T) => void);

  getValue(): T;
}
