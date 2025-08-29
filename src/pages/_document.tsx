import { Html, Head, Main, NextScript } from 'next/document';
import { prosto } from './_app';
import { Scripts } from '@/common/scripts';

export default function Document() {
  return (
    <Html className={`${prosto.variable}`} lang='ru'>
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
