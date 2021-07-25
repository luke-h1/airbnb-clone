import type { AppProps } from 'next/app';
import '@src/styles/global.scss';
import Nav from '@src/components/Nav';
import { Reset } from '@src/styles/Global';
import '@fontsource/lato';
import Container from '@src/components/Container';
import { useApollo } from '@src/utils/withApollo';
import { ApolloProvider } from '@apollo/client';
import '@src/styles/index.css';

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <Container>
        <Reset />
        <Nav {...pageProps} />
        <Component {...pageProps} />
      </Container>
    </ApolloProvider>
  );
}
export default MyApp;
