import { TypedKeyStats } from '../typed-keys/typed-key-stats.model';
import { TextToType } from '../text-to-type/text-to-type.model';
import { AppState } from './app-state.model';

export interface IAppStateClient {
  getAppState(): AppState;

  saveAppState(newAppState: AppState): void;

  setTypedKeysStatsJson(typedKeysStatsMap: Map<string, TypedKeyStats[]>): void;

  getTypedKeysStatsMap(): Map<string, TypedKeyStats[]>;

  nextTextToTypeIndex(): number;

  previousTextToTypeIndex(): number;

  getTextToTypeArray(): TextToType[];
}
