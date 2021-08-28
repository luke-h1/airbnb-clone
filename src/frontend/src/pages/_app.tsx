import '../styles/index.css';
import type { AppProps } from 'next/app';
import { useApollo } from '@frontend/src/apollo';
import { ApolloProvider } from '@apollo/client';
import { AuthProvider } from '@frontend/src/auth/useAuth';

function MyApp({ Component, pageProps }: AppProps) {
  const client = useApollo();
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </AuthProvider>
  );
}

export default MyApp;
