import type { AppProps } from 'next/app';
import Nav from '@src/components/Nav';
import '@fontsource/lato';
import Container from '@src/components/Container';
import { useApollo } from '@src/utils/withApollo';
import { ApolloProvider } from '@apollo/client';
import '@src/styles/index.css';

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <main className="max-w-4xl mx-auto antialiased mb-6">
        <Nav {...pageProps} />
      </main>
      <Container>
        <Component {...pageProps} />
      </Container>
    </ApolloProvider>
  );
}
export default MyApp;
