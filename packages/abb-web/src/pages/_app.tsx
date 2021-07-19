import type { AppProps } from 'next/app';
import '@src/styles/global.scss';
import Nav from '@src/components/Nav';
import { Reset } from '@src/styles/Global';
import '@fontsource/lato';
import Container from '@src/components/Container';
import '@src/styles/index.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Reset />
      <Nav {...pageProps} />
      <Component {...pageProps} />
    </Container>
  );
}
export default MyApp;
