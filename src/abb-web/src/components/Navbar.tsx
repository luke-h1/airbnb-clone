import styled from '@emotion/styled';
import Link from 'next/link';
import Button from '@src/components/Button';

const Nav = styled.div`
  position: sticky;
  z-index: 100;
  box-shadow: rgb(0 0 0 / 12%) 0 6px 16px;

  .flex-end {
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
  }

  .button-group {
    align-items: center;
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <div className="logo" />
      <div className="flex-end">
        <div className="button-group">
          <Link href="/login">
            <a>
              <Button text="Sign in" size="small" />
            </a>
          </Link>
          <Link href="/register">
            <a>
              <Button text="Register" size="small" />
            </a>
          </Link>
        </div>
      </div>
    </Nav>
  );
};
export default Navbar;
