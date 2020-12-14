import { BaseHtmlComponent } from './base-component';
import { IStatefulHtmlComponent } from './base-stateful-component.interface';

export abstract class BaseStatefulHtmlComponent<ComponentInput, ComponentOutput>
  extends BaseHtmlComponent
  implements IStatefulHtmlComponent<ComponentInput, ComponentOutput> {
  private callbacksOnUpdate: ((output: ComponentOutput) => void)[] = [];
  private validatorsOnUpdate: ((output: ComponentOutput) => void)[] = [];
  private callbacksOnClick: ((output: ComponentOutput) => void)[] = [];

  abstract update(input: ComponentInput): void;

  onUpdate(callback: (output: ComponentOutput) => void) {
    this.callbacksOnUpdate.push(callback);
  }

  onClick(callback: (value: ComponentOutput) => void) {
    this.callbacksOnClick.push(callback);
  }

  onValidate(validator: (output: ComponentOutput) => void) {
    this.validatorsOnUpdate.push(validator);
  }

  executeValidators(output: ComponentOutput) {
    this.validatorsOnUpdate.forEach((validator) => validator(output));
  }

  executeCallbacksOnUpdate(output: ComponentOutput) {
    this.callbacksOnUpdate.forEach((callback) => callback(output));
  }

  executeCallbacksOnClick(output: ComponentOutput) {
    this.callbacksOnClick.forEach((callback) => callback(output));
  }
}
