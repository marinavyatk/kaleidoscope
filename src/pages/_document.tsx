import { Html, Head, Main, NextScript } from 'next/document';
import { euroFontExtendedC, pyRootUI } from './_app';

export default function Document() {
  return (
    <Html className={`${euroFontExtendedC.variable} ${pyRootUI.variable}`} lang='ru'>
      <Head></Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
