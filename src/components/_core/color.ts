import { LIGHT_THEME_VALUE } from '../../constants/constant';
import { AppStateClient } from '../../state/app-state.client';
import { IAppStateClient } from '../../state/app-state.client.interface';

export class Color {
  constructor(private light: string, private dark, private appStateClient: IAppStateClient = AppStateClient.getInstance()) {}

  public get(): string {
    const appState = this.appStateClient.getAppState();
    if (appState.currentTheme == LIGHT_THEME_VALUE) {
      return this.light;
    }
    return this.dark;
  }
}

export const TYPING_SPEED_GRAPH_BAR_COLOR = new Color('#AECBFA', '#0496ff');
export const TYPING_ERROR_GRAPH_BAR_COLOR = new Color('#FFB1C1', '#e01929');
