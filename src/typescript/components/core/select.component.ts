import { SelectOption } from '../../models/select-option.model';
import { BaseInlineHtmlComponent } from '../base/base-inline-component';

export class SelectHtmlComponent<T> extends BaseInlineHtmlComponent {
  constructor(private event: string, private options: SelectOption<T>[], selectedOption: SelectOption<T>) {
    super();
  }

  __preInsertHtml(): void {}

  __toHtml() {
    return /* html */ `
      <span>select</span>
    `;
  }

  __postInsertHtml(): void {}
}
