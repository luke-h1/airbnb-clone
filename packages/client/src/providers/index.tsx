import Container from '@src/components/Container';
import AuthProvider from '@src/context/AuthContext';
import PropertyProvider from '@src/context/PropertyContext';
import Routes from '@src/Routes';
import React from 'react';

interface ProvidersProps {

}

const Providers: React.FC<ProvidersProps> = () => {
  return (
    <AuthProvider>
      <PropertyProvider>
        <Container>
          <Routes />
        </Container>
      </PropertyProvider>
    </AuthProvider>

  );
};
export default Providers;
