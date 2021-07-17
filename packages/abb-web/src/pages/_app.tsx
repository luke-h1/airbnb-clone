import type { AppProps } from 'next/app';
import '@src/styles/global.scss';
import Footer from '@src/components/Footer';
import Nav from '@src/components/Nav';
import { Reset } from '@src/styles/Global';
import '@fontsource/lato';
import { ChakraProvider } from '@chakra-ui/react';
import { useApollo } from '@src/utils/withApollo';
import { ApolloProvider } from '@apollo/client';
import '@src/styles/index.css';

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider>
        <Reset />
        <Nav {...pageProps} />
        <Component {...pageProps} />
        <Footer />
      </ChakraProvider>
    </ApolloProvider>
  );
}
export default MyApp;
