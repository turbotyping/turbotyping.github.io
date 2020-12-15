import './typed-keys.scss';
import { BaseHtmlComponent } from '../_core/base-component';

export const TYPED_KEY_CLASS = 'typed-key';

export class TypedKeysHtmlComponentInput {
  keys: string;
  selectedKey: string;
}

export class TypedKeysHtmlComponent extends BaseHtmlComponent {
  private typedKeysContainerId: string;
  private typedKeysContainer: HTMLElement;
  private input: TypedKeysHtmlComponentInput;
  private callbacks: ((key: string) => void)[] = [];

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

  onClick(callback: (key: string) => void) {
    this.callbacks.push(callback);
  }

  selectKey(key: string) {
    this.input.selectedKey = key;
    this.updateInnerHTML();
  }

  private handleTypedKeysClickEvent(event) {
    this.callbacks.forEach((callback) => callback(event.target.innerText));
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
