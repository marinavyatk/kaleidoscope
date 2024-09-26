import 'swiper/css';
import '@/styles/globals.scss';

import type { AppProps } from 'next/app';
import localFont from 'next/font/local';

export const euroFontExtendedC = localFont({
  src: [
    {
      path: '../fonts/EurofontExtendedC/eurofontextendedc.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/EurofontExtendedC/eurofontextendedc_bold.woff',
      weight: '700',
      style: 'bold',
    },
  ],
  variable: '--euroFontExtendedC',
});

export const pyRootUI = localFont({
  src: [
    {
      path: '../fonts/PTRootUI/PTRoot-UI-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/PTRootUI/PTRoot-UI-Bold.woff2',
      weight: '700',
      style: 'bold',
    },
  ],
  variable: '--pyRootUI',
});

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
