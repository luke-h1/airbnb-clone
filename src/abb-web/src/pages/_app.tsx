import type { AppProps } from 'next/app';
import Header from '@src/components/Header';
import { Reset } from '@src/styles/Global';
import '@src/styles/global.scss';
import Footer from '@src/components/Footer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Reset />
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
