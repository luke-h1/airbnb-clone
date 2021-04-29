import type { AppProps } from 'next/app';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Reset from '../styles/Reset';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider theme={theme}>
        {Reset}
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
