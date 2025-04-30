declare global {
  interface Window {
    grecaptcha: ReCaptchaInstance;
    captchaOnLoad: () => void;
  }
}
