import React from 'react';
import styled from '@emotion/styled';
import { baseColors } from '@src/styles/Variables';
import Image from 'next/image';

interface HeaderProps {}

const StyledHeader = styled.header`
  .header {
    height: 80px;
    padding: 0 24px;
    display: flex;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;
    justify-content: space-between;
    .logo,
    .nav {
      flex: 1 0 140px;
    }
  }
`;

const HeaderSearch = styled.div`
  display: inline-flex;
  border-radius: 24px;
  overflow: hidden;
  align-items: center;
  border: 1px solid ${baseColors.greyMed};
  transition: box-shadow 0.2s ease;
  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
  }
  button {
    background: transparent;
    cursor: pointer;
    height: 48px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    /* font-family: 'Circular Medium' */
    border: none;
    &:first-of-type {
      padding-left: 24px;
    }
    &:last-of-type {
      padding-right: 7px;
    }
    span {
      width: 1px;
      height: 24px;
      background: 1px solid ${baseColors.greyMed};
    }
  }
`;

const SearchIcon = styled.div`
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  margin-left: 16px;
  display: flex;
  border-radius: 50%;
  background: var(--pink);
  img {
    width: 12px;
    height: 12px;
  }
`;

const Header: React.FC<HeaderProps> = () => {
  return (
    <StyledHeader>
      <div className="logo">
        <img src="/icons/logo.svg" alt="Airbnb Logo" />
        <HeaderSearch>
          <button type="button">Selected map area</button>
          <span />
          <button type="button">Selected map area</button>
          <span />
          <button type="button">1 guest</button>
          <SearchIcon>
            <Image src="/icons/searchIcon.svg" width={12} height={12} />
          </SearchIcon>
        </HeaderSearch>
      </div>
    </StyledHeader>
  );
};
export default Header;
