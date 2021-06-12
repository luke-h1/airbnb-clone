import React from 'react';
import styled from '@emotion/styled';

const WrapperStyles = styled.div`
  margin-top: 2rem;
  margin: 0 auto;
  width: 100%;
`;

export const Wrapper: React.FC<{}> = ({ children }) => {
  return <WrapperStyles>{children}</WrapperStyles>;
};
