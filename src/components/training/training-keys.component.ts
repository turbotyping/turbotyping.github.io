import './training.scss';
import { BaseHtmlComponent } from '../_core/base-component';
import { IAppStateClient } from '../../state/app-state.client.interface';
import { AppStateClient } from '../../state/app-state.client';
import { END_TYPING_EVENT, ENTER_KEY_CODE, MIN_STATS_TO_DISPLAY_PROGRESS_GRAPH, TRAINING_LESSON_CHANGE_EVENT } from '../../constants/constant';
import { TrainingLesson } from './training-lesson.enum';

export class TrainingKeysHtmlComponent extends BaseHtmlComponent {
  private containerId: string;
  private container: HTMLElement;
  private wpmId: string;
  private wpm: HTMLElement;

  constructor(
    protected trainingLesson: TrainingLesson,
    protected trainingLessonAyString: string,
    protected appSettingsClient: IAppStateClient = AppStateClient.getInstance()
  ) {
    super();
    this.containerId = this.generateId();
    this.wpmId = this.generateId();
  }

  preInsertHtml(): void {}

  toHtml() {
    return /* html */ `
      <div tabindex="0" id="${this.containerId}" class="training-lesson-container ${this.getContainerClass()}">
        <span class="lesson-label">${this.getLessonAsString()}</span>
        <span class="lesson-category">${this.getLessonCategory()}</span>
        <span id="${this.wpmId}" class="wpm"></span>
      </div>
    `;
  }

  postInsertHtml(): void {
    this.container = document.getElementById(this.containerId);
    this.wpm = document.getElementById(this.wpmId);
    this.update();
    this.addCustomEventListener(TRAINING_LESSON_CHANGE_EVENT, this.update.bind(this));
    this.addCustomEventListener(END_TYPING_EVENT, this.update.bind(this));
    this.container.addEventListener('click', this.handleContainerClickEvent.bind(this));
    this.container.addEventListener('keydown', this.handleContainerKeyDownEvent.bind(this));
  }

  private handleContainerKeyDownEvent(event) {
    if (event.keyCode !== ENTER_KEY_CODE) {
      return;
    }
    event.stopPropagation();
    this.container.dispatchEvent(new Event('click'));
  }

  protected getContainerClass() {
    return '';
  }

  protected getLessonCategory() {
    return 'Keys';
  }

  protected getLessonAsString() {
    return this.trainingLessonAyString;
  }

  private update() {
    const appSettings = this.appSettingsClient.getAppState();
    if (appSettings.trainingLesson === this.trainingLesson) {
      this.container.classList.add('selected');
    } else {
      this.container.classList.remove('selected');
    }
    const trainingLessonStatsMap = this.appSettingsClient.getTrainingLessonStatsMap();
    const trainingLessonStats = trainingLessonStatsMap.get(this.trainingLesson);
    this.container.classList.remove('avg-wpm-lt-10', 'avg-wpm-lt-20', 'avg-wpm-lt-30', 'avg-wpm-lt-40', 'avg-wpm-lt-50', 'avg-wpm-gte-50');
    if (trainingLessonStats && trainingLessonStats.length >= MIN_STATS_TO_DISPLAY_PROGRESS_GRAPH) {
      const avgWpm = this.arrayAvg(trainingLessonStats.map((s) => s.wpm));
      if (avgWpm < 10) {
        this.container.classList.add('avg-wpm-lt-10');
      } else if (avgWpm < 20) {
        this.container.classList.add('avg-wpm-lt-20');
      } else if (avgWpm < 30) {
        this.container.classList.add('avg-wpm-lt-30');
      } else if (avgWpm < 40) {
        this.container.classList.add('avg-wpm-lt-40');
      } else if (avgWpm < 50) {
        this.container.classList.add('avg-wpm-lt-50');
      } else {
        this.container.classList.add('avg-wpm-gte-50');
      }
      this.wpm.innerHTML = `${avgWpm}`;
      this.container.title = `Typing speed: ${avgWpm}wpm`;
    }
  }

  private arrayAvg(array) {
    return Math.round(array.reduce((sum, current) => sum + current, 0) / array.length);
  }

  private handleContainerClickEvent() {
    const appSettings = this.appSettingsClient.getAppState();
    appSettings.trainingLesson = this.trainingLesson;
    this.appSettingsClient.saveAppState(appSettings);
    this.dispatchCustomEvent(TRAINING_LESSON_CHANGE_EVENT);
  }
}
