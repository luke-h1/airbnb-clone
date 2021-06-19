import type { AppProps } from 'next/app';
import Header from '@src/components/Header';
import { Reset } from '@src/styles/Global';
import '@src/styles/global.scss';
import Footer from '@src/components/Footer';
import Card from '@src/modules/property/components/Card/Card';
import { Wrapper } from '@src/components/Wrapper';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Reset />
      <Header />
      <Wrapper>
        <Card />
        <Component {...pageProps} />
      </Wrapper>
      <Footer />
    </>
  );
}

export default MyApp;
