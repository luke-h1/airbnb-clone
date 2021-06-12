import type { AppProps } from 'next/app';
import Navbar from '@src/components/Navbar';
import { Reset } from '@src/styles/Reset';
import '@src/styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Reset />
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
