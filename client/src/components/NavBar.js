import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles";

function NavBar({ user, setUser }) {
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  // <Link to="/">Craig's Cookout</Link>

  return (
    <Wrapper>
      <Logo>
        <h1>Craig's Cookout</h1>
      </Logo>
      <Nav>
        <Button as={Link} to="/about">
          About
        </Button> 
        <Button as={Link} to="/cookouts">
          Cookout
        </Button>
        <Button as={Link} to="/foods">
          Food
        </Button>
        <Button as={Link} to="/locations">
          Location
        </Button>
        <Button as={Link} to="/viewcookouts">
          View Cookouts
        </Button>
        <Button variant="outline" onClick={handleLogoutClick}>
          Logout
        </Button>
      </Nav>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;

const Logo = styled.h1`
  font-family: "Permanent Marker", cursive;
  font-size: 2rem;
  color: red;
  margin: 0;
  line-height: 1;

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 4px;
  position: absolute;
  left: 20px;
`;

export default NavBar;
