import './feedback.scss';
import { BaseHtmlComponent } from '../_core/base-component';
import { FeedbackFormHtmlComponent } from './feedback-form.component';

export class FeedbackHtmlComponent extends BaseHtmlComponent {
  private feedbackIconId: string;
  private feedbackIcon: HTMLElement;
  private feedbackForm: FeedbackFormHtmlComponent = new FeedbackFormHtmlComponent();

  preInsertHtml(): void {
    this.feedbackIconId = this.generateId();
    this.feedbackForm.preInsertHtml();
  }

  toHtml() {
    return /* html */ `
      <button id="${this.feedbackIconId}" class="feedback-button">
        <span class="feedback-label">Your feedback help us a lot :)</span>
        <span class="iconify" data-icon="jam:message"></span>
      </button>
      ${this.feedbackForm.toHtml()}
    `;
  }

  postInsertHtml(): void {
    this.feedbackIcon = document.getElementById(this.feedbackIconId);
    this.feedbackIcon.addEventListener('click', () => this.feedbackForm.open());
    this.feedbackForm.postInsertHtml();
  }
}
