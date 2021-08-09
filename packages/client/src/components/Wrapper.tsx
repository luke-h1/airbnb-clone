import React from 'react';
import { Container } from '@chakra-ui/react';

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <Container mt={2} mb={2}>
      {children}
    </Container>
  );
};
export default Wrapper;
