import './input.scss';
import { InputHtmlComponent } from './input.component';

export class LabeledInputHtmlComponent extends InputHtmlComponent {
  constructor(private label: string, value: string, private mandatory = true, private maxLength: number = Number.MAX_VALUE) {
    super(value);
  }

  toHtml() {
    return /* html */ `
      <span class="input-label">
        ${this.label}
        ${this.mandatory ? '<span class="input-label-mandatory">*</span>' : ''}
      </span>
      ${super.toHtml()}
    `;
  }

  postInsertHtml() {
    super.postInsertHtml();
    if (this.mandatory) {
      this.onValidate((value: string) => {
        if (!value) {
          throw new Error('Required');
        }
      });
    }
    this.onValidate((value) => {
      if (value && value.length > this.maxLength) {
        throw new Error('Max length exceeded: ' + this.maxLength + ' characters');
      }
    });
  }
}
