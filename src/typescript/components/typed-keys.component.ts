import { TypedKeyStats } from '../models/typed-key-stats.model';
import { BaseBlockHtmlComponent } from './base/base-block-component';

export const TYPED_KEY_CLASS = 'typed-key';

export class TypedKeysHtmlComponent extends BaseBlockHtmlComponent {
  private typedKeysContainerId: string;
  private typedKeysContainer: HTMLElement;
  private callbacks: ((key: string) => void)[] = [];

  constructor(
    private keys: string,
    private selectedKey: string,
    private typedKeysStatsToProgressData: (typedKeysStats: TypedKeyStats[]) => number[]
  ) {
    super();
  }

  __preInsertHtml(): void {
    this.typedKeysContainerId = this.getRandomId();
  }

  __toHtml() {
    return /* html */ `
      <div id="${this.typedKeysContainerId}" class="typed-keys-container"></div>
    `;
  }

  __postInsertHtml(): void {
    this.typedKeysContainer = document.getElementById(this.typedKeysContainerId);
    this.update();
    this.typedKeysContainer.addEventListener('click', this.handleTypedKeysClickEvent.bind(this));
  }

  onClick(callback: (key: string) => void) {
    this.callbacks.push(callback);
  }

  selectKey(key: string) {
    this.selectedKey = key;
    this.update();
  }

  private handleTypedKeysClickEvent(event) {
    this.executeCallbacks(event.target.innerText);
  }

  private executeCallbacks(key: string) {
    this.callbacks.forEach((callback) => callback(key));
  }

  private update() {
    this.typedKeysContainer.innerHTML = this.keys
      .split('')
      .map((c) =>
        c === this.selectedKey ? `<span class="${TYPED_KEY_CLASS} selected-key">${c}</span>` : `<span class="${TYPED_KEY_CLASS}">${c}</span>`
      )
      .join('');
  }
}
