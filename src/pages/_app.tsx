import 'swiper/css';
import '@/styles/globals.scss';
import 'swiper/css/scrollbar';

import type { AppProps } from 'next/app';
import { Prosto_One } from 'next/font/google';

export const prosto = Prosto_One({
  subsets: ['cyrillic'],
  variable: '--prosto',
  display: 'auto',
  weight: ['400'],
});

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
