import styled from '@emotion/styled';

const Nav = styled.div`
position: sticky;
z-index: 100;
box-shadow: rgb(0 0 0 / 12%) 0 6px 16px;
padding: 30px;

`;

const Navbar = () => {
  return (
    <Nav>
      <div className="logo">
        hello
      </div>

    </Nav>

  );
};
export default Navbar;
