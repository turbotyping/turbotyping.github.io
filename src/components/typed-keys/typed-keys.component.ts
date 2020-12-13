import './typed-keys.scss';
import { BaseStatefulHtmlComponent } from '../common/ts/base/base-stateful-component';

export const TYPED_KEY_CLASS = 'typed-key';

export class TypedKeysHtmlComponentInput {
  keys: string;
  selectedKey: string;
}

export class TypedKeysHtmlComponent extends BaseStatefulHtmlComponent<TypedKeysHtmlComponentInput, string> {
  private typedKeysContainerId: string;
  private typedKeysContainer: HTMLElement;
  private input: TypedKeysHtmlComponentInput;

  constructor(keys: string, selectedKey: string) {
    super();
    this.input = {
      keys,
      selectedKey,
    };
  }

  preInsertHtml(): void {
    this.typedKeysContainerId = this.generateId();
  }

  toHtml() {
    return /* html */ `
      <div id="${this.typedKeysContainerId}" class="typed-keys-container"></div>
    `;
  }

  postInsertHtml(): void {
    this.typedKeysContainer = document.getElementById(this.typedKeysContainerId);
    this.updateInnerHTML();
    this.typedKeysContainer.addEventListener('click', this.handleTypedKeysClickEvent.bind(this));
  }

  getContainerQuerySelector(): string {
    return `#${this.typedKeysContainerId}`;
  }

  update(input: TypedKeysHtmlComponentInput): void {
    this.input = input;
    this.updateInnerHTML();
  }

  selectKey(key: string) {
    this.input.selectedKey = key;
    this.updateInnerHTML();
  }

  private handleTypedKeysClickEvent(event) {
    this.executeCallbacksOnUpdate(event.target.innerText);
  }

  private updateInnerHTML() {
    this.typedKeysContainer.innerHTML = this.input.keys
      .split('')
      .map((c) =>
        c.toUpperCase() === this.input.selectedKey.toUpperCase()
          ? `<span class="${TYPED_KEY_CLASS} selected-key">${c.toUpperCase()}</span>`
          : `<span class="${TYPED_KEY_CLASS}">${c.toUpperCase()}</span>`
      )
      .join('');
  }
}
