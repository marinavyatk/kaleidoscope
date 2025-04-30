export interface ReCaptchaInstance {
  ready: (cb: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
}

declare global {
  interface Window {
    grecaptcha: ReCaptchaInstance;
  }
}

export {};
