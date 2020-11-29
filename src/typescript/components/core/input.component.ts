import { BaseInlineUserInputHtmlComponent } from '../base/base-inline-user-input-component';

export class InputHtmlComponent extends BaseInlineUserInputHtmlComponent<string> {
  private input: HTMLElement;

  constructor(private value: string) {
    super();
  }

  __preInsertHtml(): void {}

  __toHtml() {
    return /* html */ `
      <input class="input" type="text" value="${this.value}"/>
    `;
  }

  __postInsertHtml(): void {
    this.input = document.querySelector('.input');
  }

  getValue(): string {
    return this.value;
  }

  blur() {
    this.input.blur();
  }

  focus() {
    this.input.focus();
  }
}
