import './textarea.scss';
import { TextAreaHtmlComponent } from './textarea.component';

export class LabeledTextAreaHtmlComponent extends TextAreaHtmlComponent {
  constructor(
    private label: string,
    value: string,
    private mandatory = true,
    private maxLength: number = Number.MAX_VALUE,
    cssWidth: string = '100%',
    cssHeight: string = '10rem'
  ) {
    super(value, cssWidth, cssHeight);
  }

  toHtml() {
    return /* html */ `
    <span class="textarea-label">
      ${this.label}
      ${this.mandatory ? '<span class="textarea-label-mandatory">*</span>' : ''}
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
