export class AdsUtils {
  static onBlocked = (callback: (reason: any) => any) => {
    const googleAdUrl = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    fetch(new Request(googleAdUrl)).catch(callback);
  };
  static onNotBlocked = (callback: () => any) => {
    const googleAdUrl = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    fetch(new Request(googleAdUrl)).then(callback);
  };
}
