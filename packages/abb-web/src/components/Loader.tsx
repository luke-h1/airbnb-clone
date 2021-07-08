import React from 'react';
import { Spinner } from '@chakra-ui/react';

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface LoaderProps {
  size: Size;
}

export const Loader: React.FC<LoaderProps> = ({ size }) => {
  return (
    <Spinner
      thickness="4px"
      speed="0.75s"
      emptyColor="gray.200"
      color="blue.500"
      size={size}
    />
  );
};
