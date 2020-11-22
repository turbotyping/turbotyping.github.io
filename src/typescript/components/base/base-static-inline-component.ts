import { BaseInlineHtmlComponent } from './base-inline-component';

export abstract class BaseStaticInlineHtmlComponent extends BaseInlineHtmlComponent {
  __preInsertHtml(): void {
    // nothing to do by default!
  }
  __postInsertHtml(): void {
    // nothing to do by default!
  }
}
