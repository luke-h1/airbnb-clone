import React from 'react';
import styled from '@emotion/styled';
import { baseColors } from '@src/styles/Variables';
import Image from 'next/image';
import Link from 'next/link';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '@src/utils/createUrqlClient';
// import { useLogoutMutation, useMeQuery } from '@src/generated/graphql';
import { useMeQuery } from '@src/generated/graphql';
// import { useRouter } from 'next/router';
import { isServer } from '@src/utils/isServer';

// @TODO: on click event to open menu. -> sign in / sign out depending on the state

interface HeaderProps {}

const StyledHeader = styled.header`
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

const HeaderNavigation = styled.div`
  flex: 1 0 140px;
  display: flex;
  justify-content: flex-end;
  .button {
    background: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 16px;
    text-decoration: none;
    color: rgb(34, 34, 34);
    height: 48px;
    border-radius: 22px;
    cursor: pointer;
    &-greyHover {
      &:hover {
        background: ${baseColors.greyTextLight};
      }
    }
    &-language {
      img {
        &:first-child {
          width: 16px;
          height: 16px;
        }
        &:last-child {
          width: 9px;
          height: 6px;
          margin-left: 6px;
        }
      }
    }
    &-account {
      border: 1px solid ${baseColors.greyMed};
      height: 42px;
      border-radius: 22px;
      padding: 5px 5px 5px 12px;
      transition: box-shadow 0.2s ease;
      &:hover {
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
      }
      img {
        &:first-child {
          height: 16px;
          width: 16px;
        }
        &:last-child {
          width: 30px;
          height: 30px;
          margin-left: 12px;
        }
      }
    }
  }
`;

const Header: React.FC<HeaderProps> = () => {
  // const router = useRouter();
  // const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });

  // const handleLogout = async () => {
  //   await logout();
  //   router.reload();
  // };

  let navLinks = null;

  if (fetching) {
    // user is not logged in
  }
  if (!data?.me) {
    navLinks = (
      <>
        <Link href="/login">
          <a className="button button-greyHover">Login</a>
        </Link>
        <Link href="/register">
          <a className="button button-greyHover">register</a>
        </Link>
      </>
    );
  } else {
    // user is logged in
    navLinks = (
      <>
        <Link href="/">
          <a className="button button-greyHover">
            {data?.me?.email} ({data?.me?.firstName} {data?.me?.lastName})
          </a>
        </Link>
        <Link href="/create-property">
          <a className="button button-greyHover">Create Listing</a>
        </Link>
      </>
    );
  }

  return (
    <StyledHeader>
      <div className="logo">
        <img src="/icons/logo.svg" alt="Airbnb Logo" />
      </div>
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
      <HeaderNavigation>
        {navLinks}
        <button
          className="
            button
            button-language
            button-greyHover
          "
          type="button"
        >
          <img src="/icons/globe.svg" alt="globe" />
          <img src="/icons/chevronDown.svg" alt="down" />
        </button>
      </HeaderNavigation>
    </StyledHeader>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: false })(Header);
