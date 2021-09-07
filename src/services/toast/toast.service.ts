import './toast.scss';

export class ToastClient {
  private container: HTMLElement;
  private static instance: ToastClient = null;

  private constructor() {
    this.container = document.createElement('div');
    this.container.classList.add('toast-container');
    document.body.appendChild(this.container);
  }

  public static getInstance() {
    if (ToastClient.instance == null) {
      ToastClient.instance = new ToastClient();
    }
    return ToastClient.instance;
  }

  info(message: string): void {
    this.container.classList.remove('error', 'warn', 'info');
    this.container.classList.add('info');
    this.show(message);
  }

  warn(message: string): void {
    this.container.classList.remove('error', 'warn', 'info');
    this.container.classList.add('warn');
    this.show(message);
  }

  error(message: string): void {
    this.container.classList.remove('error', 'warn', 'info');
    this.container.classList.add('error');
    this.show(message);
  }

  private show(message: string): void {
    this.container.innerHTML = message;
    this.container.style.right = '2rem';
    setTimeout(this.hide.bind(this), 4000);
  }

  hide(): void {
    this.container.style.right = '-30rem';
  }
}
