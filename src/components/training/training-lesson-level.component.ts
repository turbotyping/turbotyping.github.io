import './training.scss';
import { BaseHtmlComponent } from '../_core/base-component';

export class TrainingLessonLevelHtmlComponent extends BaseHtmlComponent {
  constructor(private level: string) {
    super();
  }

  preInsertHtml(): void {}

  toHtml() {
    return /* html */ `
      <div class="training-lesson-level-container">
        <span class="lesson-level">${this.level}</span>
      </div>
    `;
  }

  postInsertHtml(): void {}
}
