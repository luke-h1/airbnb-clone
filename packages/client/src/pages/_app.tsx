import '../styles/index.css';
import Container from '@src/components/Container';
import Nav from '@src/components/Nav';
import React from 'react';
import PropertyProvider from '@src/context/PropertyContext';
import AuthProvider from '@src/context/AuthContext';

// @ts-ignore
function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <PropertyProvider>
          <Container>
            <Nav />
            <Component {...pageProps} />
          </Container>
        </PropertyProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
