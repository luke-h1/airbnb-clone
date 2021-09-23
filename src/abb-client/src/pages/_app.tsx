import type { AppProps } from 'next/app';
import '@fontsource/lato';
import { ChakraProvider } from '@chakra-ui/react';
import Nav from '@src/components/Nav';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider>
        <Nav {...pageProps} />
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}
export default MyApp;
