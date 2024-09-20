import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='ru'>
      <Head>
        <link
          rel='preload'
          href='/fonts/EurofontExtendedC/eurofontextendedc.otf'
          as='font'
          type='font/otf'
          crossOrigin='anonymous'
        />
        <link
          rel='preload'
          href='/fonts/EurofontExtendedC/eurofontextendedc_bold.otf'
          as='font'
          type='font/otf'
          crossOrigin='anonymous'
        />
        <link
          rel='preload'
          href='/fonts/PTRootUI/PTRoot-UI-Medium.ttf'
          as='font'
          type='font/ttf'
          crossOrigin='anonymous'
        />
        <link
          rel='preload'
          href='/fonts/PTRootUI/PTRoot-UI-Bold.ttf'
          as='font'
          type='font/ttf'
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
