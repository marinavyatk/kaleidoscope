export const getRecaptchaToken = async (): Promise<string> => {
  if (typeof window === 'undefined' || !window.grecaptcha) {
    throw new Error('reCAPTCHA должен вызываться только на клиенте');
  }

  await new Promise<void>((resolve) => window.grecaptcha.ready(resolve));

  return await window.grecaptcha.execute('6LdLxCkrAAAAAMLe6DCcMo0qEPyxSzke98iEEmxP', {
    action: 'submit',
  });
};
