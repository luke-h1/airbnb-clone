import React from 'react';
import Container from './components/Container';
import AuthProvider from './context/AuthContext';
import PropertyProvider from './context/PropertyContext';
import Routes from './Routes';

interface AppProps {

}

const App: React.FC<AppProps> = ({}) => {
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
export default App;
