import type { AppProps } from 'next/app';
import Nav from '@src/components/Nav';
import '@fontsource/lato';
import Container from '@src/components/Container';
import '@src/styles/index.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <main className="max-w-4xl mx-auto antialiased mb-6">
        <Nav {...pageProps} />
      </main>
      <Container>
        <Component {...pageProps} />
      </Container>
    </>
  );
}
export default MyApp;
