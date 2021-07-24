import '../styles/index.css';
import type { AppProps } from 'next/app';
import Container from '@src/components/Container';
import Nav from '@src/components/Nav';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Container>
        <Nav />
        <Component {...pageProps} />
      </Container>
    </>
  );
}

export default MyApp;
