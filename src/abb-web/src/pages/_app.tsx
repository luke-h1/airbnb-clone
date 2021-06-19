import type { AppProps } from 'next/app';
import '@src/styles/global.scss';
import Footer from '@src/components/Footer';
import { Wrapper } from '@src/components/Wrapper';
import Header from '@src/components/Header';
import { Reset } from '@src/styles/Global';
import '@fontsource/lato';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Reset />
      <Header {...pageProps} />
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
      <Footer />
    </>
  );
}
export default MyApp;
