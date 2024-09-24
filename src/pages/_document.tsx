import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='ru'>
      <Head>
        <link
          rel='preload'
          href='/fonts/EurofontExtendedC/eurofontextendedc.woff'
          as='font'
          type='font/woff'
          crossOrigin='anonymous'
        />
        <link
          rel='preload'
          href='/fonts/EurofontExtendedC/eurofontextendedc_bold.woff'
          as='font'
          type='font/woff'
          crossOrigin='anonymous'
        />
        <link
          rel='preload'
          href='/fonts/PTRootUI/PTRoot-UI-Medium.woff'
          as='font'
          type='font/woff'
          crossOrigin='anonymous'
        />
        <link
          rel='preload'
          href='/fonts/PTRootUI/PTRoot-UI-Bold.woff'
          as='font'
          type='font/woff'
          crossOrigin='anonymous'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
