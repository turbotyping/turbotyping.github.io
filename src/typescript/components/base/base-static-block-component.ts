import { BaseBlockHtmlComponent } from './base-block-component';

export abstract class BaseStaticBlockHtmlComponent extends BaseBlockHtmlComponent {
  __preInsertHtml(): void {
    // nothing to do by default!
  }
  __postInsertHtml(): void {
    // nothing to do by default!
  }
}
