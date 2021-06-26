import React from 'react';
import styled from '@emotion/styled';
import { baseColors } from '@src/styles/Variables';
import Link from 'next/link';
import { useLogoutMutation, useMeQuery } from '@src/generated/graphql';
import { useRouter } from 'next/router';
import { isServer } from '@src/utils/isServer';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '@src/utils/createUrqlClient';
import Image from 'next/image';
import { Loader } from './Loader';

const StyledHeader = styled.header`
  height: 80px;
  width: 100vw;
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
  display: flex;
  border-radius: 24px;
  overflow: hidden;
  font-size: 18px;
  align-items: center;
  transition: box-shadow 0.2s ease;
  a {
    margin: 0 10px 0 10px;
    color: #000;
    text-decoration: none;
    font-size: 14px;
    &:hover { 
      cursor: pointer;
    }
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

const ImgWrapper = styled.span`
  width: 50px;
  height: 50px;
  margin: 0 15px 0 16px;
  img {
    width: 100%;
    border-radius: 30px;
    object-fit: cover;
  }
`;

const Header: React.FC<{}> = () => {
  const router = useRouter();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });

  const handleLogout = async () => {
    await logout();
    router.reload();
  };

  let navLinks = null;
  let authLinks = null;

  if (fetching) {
    // user is not logged in
  }
  if (!data?.me) {
    authLinks = null;

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
        <ImgWrapper>
          {data?.me.picture && (
            <Image
              src={data.me.picture}
              alt={`${data.me.firstName}'s profle picture`}
              width={50}
              height={50}
            />
          )}
        </ImgWrapper>
        {logoutFetching ? (
          <Loader size="sm" />
        ) : (
          <button onClick={handleLogout} type="button">
            logout
          </button>
        )}
      </>
    );
    authLinks = (
      <>
        <Link href="/property/create-property">
          <a>Create Property</a>
        </Link>
        <Link href="/account">
          <a>View account</a>
        </Link>
      </>
    );
  }

  return (
    <StyledHeader>
      <div className="logo">
        <Link href="/">
          <a>
            <img src="/icons/logo.svg" alt="Airbnb Logo" />
          </a>
        </Link>
      </div>
      <HeaderSearch>{authLinks}</HeaderSearch>
      <HeaderNavigation>{navLinks}</HeaderNavigation>
    </StyledHeader>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: false })(Header);
