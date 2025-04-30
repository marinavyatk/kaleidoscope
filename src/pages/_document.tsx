import { Html, Head, Main, NextScript } from 'next/document';
import { euroFontExtendedC, pyRootUI } from './_app';
import { Scripts } from '@/common/scripts';

export default function Document() {
  return (
    <Html className={`${euroFontExtendedC.variable} ${pyRootUI.variable}`} lang='ru'>
      <Head>
        <Scripts />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
