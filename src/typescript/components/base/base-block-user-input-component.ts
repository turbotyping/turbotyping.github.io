import { BaseBlockHtmlComponent } from './base-block-component';
import { UserInput } from './user-input.interface';

export abstract class BaseBlockUserInputHtmlComponent<T> extends BaseBlockHtmlComponent implements UserInput<T> {
  private callbacks: ((value: T) => void)[] = [];

  onUpdate(callback: (value: T) => void) {
    this.callbacks.push(callback);
  }

  abstract getValue(): T;

  executeCallbacks(): void {
    this.callbacks.forEach((callback) => callback(this.getValue()));
  }
}
