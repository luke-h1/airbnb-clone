import React from 'react';
import styled from '@emotion/styled';

const WrapperStyles = styled.div`
  position: relative;
  padding-top: 80px;
  min-height: calc(100vh - 80px);
  width: 840px;
  padding: 60px 24px 0;
  h1 {
    font-size: 34px;
    margin-top: 18px;
  }
`;

export const Wrapper: React.FC<{}> = ({ children }) => {
  return <WrapperStyles>{children}</WrapperStyles>;
};
