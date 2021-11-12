import { CHANGE_THEME_EVENT, LIGHT_THEME_VALUE } from '../constants/constant';
import { AppStateClient } from '../state/app-state.client';

export class WebsiteDescriptionUtils {
  static showHomeKeysPositionImage() {
    WebsiteDescriptionUtils.changeHomeKeysPositionImage();
    document.addEventListener(CHANGE_THEME_EVENT, WebsiteDescriptionUtils.changeHomeKeysPositionImage);
  }

  private static changeHomeKeysPositionImage() {
    const appStateClient = AppStateClient.getInstance();
    const homeKeysPositionImage = document.getElementById('homeKeysPositionImage') as HTMLImageElement;
    if (appStateClient.getAppState().currentTheme == LIGHT_THEME_VALUE) {
      homeKeysPositionImage.src = './home-keys-position-light.svg';
    } else {
      homeKeysPositionImage.src = './home-keys-position-dark.svg';
    }
  }
}
