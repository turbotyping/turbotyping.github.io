import { ChangeThemeIconHtmlComponent } from './change-theme-icon.component';
import { BaseHtmlComponent } from './component';

export class NavbarHtmlComponent extends BaseHtmlComponent {
  private navbarDomElement: HTMLElement;
  private changeThemeIcon = new ChangeThemeIconHtmlComponent();

  _preInsertHtml() {
    this.changeThemeIcon.preInsertHtml();
  }

  _toHtml() {
    return /* html */ `
      <nav>
        <div class='left'>
          <a href='/'>
            <img src='/logo.png' alt='logo' />
            <span>Enjoy Typing</span>
          </a>
        </div>
        <div class='right'>
          <span class="change-theme-icon">${this.changeThemeIcon.toHtml()}</span>
        </div>
      </nav>
    `;
  }

  _postInsertHtml() {
    this.changeThemeIcon.postInsertHtml();
    this.navbarDomElement = document.querySelector('nav');
    window.addEventListener('scroll', this.onWindowScrollEvent.bind(this));
  }

  private onWindowScrollEvent() {
    if (window.scrollY === 0) {
      this.navbarDomElement.classList.remove('shadow');
    } else {
      this.navbarDomElement.classList.add('shadow');
    }
  }
}
