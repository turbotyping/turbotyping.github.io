import { IHtmlComponent } from './base-component.interface';

export interface IStatefulHtmlComponent<ComponentInput, ComponentOutput> extends IHtmlComponent {
  update(state: ComponentInput): void;

  onUpdate(callback: (value: ComponentOutput) => void);

  onClick(callback: (value: ComponentOutput) => void);

  onValidate(validator: (value: ComponentOutput) => void);
}
