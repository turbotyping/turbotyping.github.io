import './training.scss';
import { TrainingKeysHtmlComponent } from './training-keys.component';
import { TrainingLesson } from './training-lesson.enum';
import { IAppStateClient } from '../../state/app-state.client.interface';
import { AppStateClient } from '../../state/app-state.client';

export class TrainingRowHtmlComponent extends TrainingKeysHtmlComponent {
  constructor(trainingLesson: TrainingLesson, trainingLessonAyString: string, appSettingsClient: IAppStateClient = AppStateClient.getInstance()) {
    super(trainingLesson, trainingLessonAyString, appSettingsClient);
  }

  protected getContainerClass() {
    return 'training-row-container';
  }

  protected getLessonCategory() {
    return 'Row';
  }
}
