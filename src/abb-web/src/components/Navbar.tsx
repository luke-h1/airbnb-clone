import styled from '@emotion/styled';
import Link from 'next/link';
import Button from '@src/components/Button';
import { isServer } from '@src/hooks/isServer';
import { useLogoutMutation, useMeQuery } from '@src/generated/graphql';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '@src/utils/createUrqlClient';

const Nav = styled.div`
  position: sticky;
  z-index: 100;
  box-shadow: rgb(0 0 0 / 12%) 0 6px 16px;
  align-items: center;

  .flex-end {
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
  }

  .button-group {
    align-items: center;
  }

  .user { 
    text-align: left;
    font-size: 18px;
  }
`;

const Navbar = () => {
  const router = useRouter();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  let body = null;

  const handleLogout = async () => {
    await logout();
    router.reload();
  };

  if (fetching) {
    // user is not logged in
  } if (!data?.me) {
    body = (
      <>
        <Link href="/login">
          <a>
            <Button>
              Sign In
            </Button>
          </a>
        </Link>
        <Link href="/register">
          <a>
            <Button>
              Register
            </Button>
          </a>
        </Link>
      </>
    );
  } else {
    // user is logged in
    body = (
      <>
        <div className="user">
          👋 {data.me.email}
        </div>
        {logoutFetching ? (
          <p>loading..</p>
        ) : (
          <Button onClick={handleLogout()}>
            Logout
          </Button>
        )}

        <Link href="/create-listing">
          <a>
            <Button>
              Create listing
            </Button>
          </a>
        </Link>

      </>
    );
  }

  return (
    <Nav>
      <div className="logo" />
      <div className="flex-end">
        {body}
        <div className="button-group" />
      </div>
    </Nav>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: false })(Navbar);
