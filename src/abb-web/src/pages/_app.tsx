import type { AppProps } from 'next/app';
import '@src/styles/global.scss';
import Footer from '@src/components/Footer';
import { Wrapper } from '@src/components/Wrapper';
import Header from '@src/components/Header';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header {...pageProps} />
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
      <Footer />
    </>
  );
}
export default MyApp;
