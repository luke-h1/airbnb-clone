import type { AppProps } from 'next/app';
import Navbar from '@src/components/Navbar';
import { Reset } from '@src/styles/Reset';

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
