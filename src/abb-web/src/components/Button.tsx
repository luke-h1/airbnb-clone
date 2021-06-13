import styled from '@emotion/styled';
import React from 'react';

export const ButtonStyles = styled.button`
  padding: 10px;
  color: rgb(255, 255, 255);
  text-align: center;
  display: inline-block !important;
  position: relative !important;
  text-align: center !important;
  text-decoration: none !important;
  touch-action: manipulation !important;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif !important;
  font-size: 16px !important;
  line-height: 20px !important;
  font-weight: 600 !important;
  border-radius: 8px !important;
  outline: none !important;
  padding: 14px 24px !important;
  transition: box-shadow 0.2s ease 0s, -ms-transform 0.1s ease 0s, -webkit-transform 0.1s ease 0s, transform 0.1s ease 0s !important;
  border: none !important;
  background: linear-gradient(to right, rgb(230, 30, 77) 0%, rgb(227, 28, 95) 50%, rgb(215, 4, 102) 100%) !important;
  color: rgb(255, 255, 255) !important;
  /* width: 100% !important; */
  width: 80px;
  margin: 0 10px 0 10px !important;
  cursor: pointer;
}
`;

interface ButtonProps {
  onClick?: () => Promise<void>;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children }) => {
  return <ButtonStyles>{children}</ButtonStyles>;
};
export default Button;
