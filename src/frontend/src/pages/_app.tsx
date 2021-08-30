import { AppProps } from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from 'src/apollo';
import { AuthProvider } from 'src/auth/useAuth';
import 'src/styles/index.css';
import Layout from 'src/components/layout';

export default function MyApp({ Component, pageProps }: AppProps) {
  const client = useApollo();
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </AuthProvider>
  );
}
