import './select.scss';
import { SelectHtmlComponent, SelectHtmlComponentInput } from './select.component';

export class LabeledSelectHtmlComponent<T> extends SelectHtmlComponent<T> {
  constructor(input: SelectHtmlComponentInput<T>, private label: string) {
    super(input);
  }

  toHtml() {
    return /* html */ `
      <span class="select-label">${this.label}</span>
      ${super.toHtml()}
    `;
  }
}
