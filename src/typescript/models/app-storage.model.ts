import { TypedTextStats } from './typed-text-stats.model';

export class AppStorage {
  currentTheme: string;
  textToTypeIndex: number = 0;
  typedTextStats: TypedTextStats[] = [];
}
