import '../styles/index.css';
import Container from '@src/components/Container';
import Nav from '@src/components/Nav';
import React from 'react';
import PropertyProvider from '@src/context/PropertyContext';
import AuthState from '@src/context/Auth/AuthState';

// @ts-ignore
function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthState>
        <PropertyProvider>
          <Container>
            <Nav />
            <Component {...pageProps} />
          </Container>
        </PropertyProvider>
      </AuthState>
    </>
  );
}

export default MyApp;
