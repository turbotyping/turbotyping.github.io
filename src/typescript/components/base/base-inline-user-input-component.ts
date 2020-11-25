import { BaseInlineHtmlComponent } from './base-inline-component';
import { UserInput } from './user-input.interface';

export abstract class BaseInlineUserInputHtmlComponent<T> extends BaseInlineHtmlComponent implements UserInput<T> {
  private callbacks: ((value: T) => void)[] = [];

  onUpdate(callback: (value: T) => void) {
    this.callbacks.push(callback);
  }

  abstract getValue(): T;

  executeCallbacks(): void {
    this.callbacks.forEach((callback) => callback(this.getValue()));
  }
}
