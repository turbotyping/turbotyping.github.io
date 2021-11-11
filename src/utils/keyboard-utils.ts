import { ESCAPE_KEY_CODE } from '../constants/constant';

export class KeyboardUtils {
  static blurActiveElementOnEscapeKeydownEvent() {
    document.addEventListener('keydown', (event) => {
      if (event.keyCode == ESCAPE_KEY_CODE) {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      }
    });
  }
}
