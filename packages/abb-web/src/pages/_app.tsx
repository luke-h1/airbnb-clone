import type { AppProps } from 'next/app';
import '@src/styles/global.scss';
import Footer from '@src/components/Footer';
import Nav from '@src/components/Nav';
import '@fontsource/lato';
import '@src/styles/index.css';
import Container from '@src/components/Container';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Nav {...pageProps} />
      <Component {...pageProps} />
      <Footer />
    </Container>
  );
}
export default MyApp;
