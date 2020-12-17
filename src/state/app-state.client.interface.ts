import { TypedKeyStats } from '../components/typed-keys/typed-key-stats.model';
import { TextToType } from '../components/text-to-type/text-to-type.model';
import { AppState } from './app-state.model';

export interface IAppStateClient {
  getAppState(): AppState;

  saveAppState(newAppState: AppState): void;

  toTypedKeysStatsJson(typedKeysStatsMap: Map<string, TypedKeyStats[]>): string;

  toTypedKeysStatsMap(typedKeysStatsJson: string): Map<string, TypedKeyStats[]>;

  getTypedKeysStatsMap(): Map<string, TypedKeyStats[]>;

  nextTextToTypeIndex(): number;

  previousTextToTypeIndex(): number;

  getTextToTypeArray(): TextToType[];
}
