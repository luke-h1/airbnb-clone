import type { AppProps } from 'next/app';
import Header from '@src/components/Header';
import { Reset } from '@src/styles/Global';
import '@src/styles/global.scss';
import Footer from '@src/components/Footer';
import PropertyCard from '@src/modules/property/components/PropertyCard';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Reset />
      <Header />
      <PropertyCard />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
