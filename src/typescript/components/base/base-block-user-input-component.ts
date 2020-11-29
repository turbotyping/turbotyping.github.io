import { BaseBlockHtmlComponent } from './base-block-component';
import { UserInput } from './user-input.interface';

export abstract class BaseBlockUserInputHtmlComponent<T> extends BaseBlockHtmlComponent implements UserInput<T> {
  private callbacks: ((value: T) => void)[] = [];
  private validators: ((value: T) => void)[] = [];

  onUpdate(callback: (value: T) => void) {
    this.callbacks.push(callback);
  }

  onValidate(validator: (value: T) => void) {
    this.validators.push(validator);
  }

  executeCallbacks(value: T): void {
    this.callbacks.forEach((callback) => callback(value));
  }

  executeValidator(value: T): void {
    this.validators.forEach((validator) => validator(value));
  }
}
