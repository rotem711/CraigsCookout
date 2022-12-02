import React, { useState, useContext, createContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles";
// Example of using 'useContext' hook:
// import ThemeContext from "./context/ThemeContext";
// import ThemeDiv from "./context/ThemeDiv";

// const themes = {
//   light: {
//     background: "yellow" 
//   },
//   dark: {
//     background: "black"
//   }
// };

// const ThemeContext = React.createContext(themes.light);

function NavBar({ user, setUser }) {
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  // Get the current date timestamp to determine the current hour for 'dark mode' settings:
  // const currentDate = new Date();
  // const currentHour = `${currentDate.getHours()}`;
  // setHour(currentHour);
  // console.log("currentHour in 24 hour clock: ", currentHour);

  // if (currentHour > 17) {
  //   context.updateContext({color1: "black"});
  // }

  return (
    <>
      <Wrapper>
        <Logo>
          <h1>Craig's Cookout</h1>
        </Logo>
        <Nav>
          <Button as={Link} to="/about">
            About
          </Button> 
          <Button as={Link} to="/cookouts">
            Cookouts
          </Button>
          <Button as={Link} to="/foods">
            Foods
          </Button>
          <Button as={Link} to="/locations">
            Locations
          </Button>
          <Button as={Link} to="/viewcookouts">
            View All Cookouts
          </Button>
          <Button variant="outline" onClick={handleLogoutClick}>
            Logout
          </Button>
        </Nav>
        <UsernameTag>
          <p>Welcome, {user.username}!</p>
        </UsernameTag>
          </Wrapper>
    </>
  );
}

// This is what will utilize the 'useContext' hook to change the theme of the app dependent upon the time of day:
// function ThemeDiv() {
//   return (
//       <div>
//         styled.div`background-color: ${currentTheme.background};`
//       </div>
//   );
// }

const Wrapper = styled.div`
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

const UsernameTag = styled.h1`
  font-family: "Permanent Marker", cursive;
  font-size: 2rem;
  color: blue;
  margin: 0;
  line-height: 1;

  a {
    color: inherit;
    text-decoration: none;
  }

  display: flex;
  position: absolute;
  right: 20px;
`

const Nav = styled.nav`
  display: flex;
  gap: 4px;
  position: absolute;
  left: 20px;
`;

export default NavBar;

// function ThemeDiv({ currentHour }) {
//     // const theme = useContext(ThemeContext)

// const themedDiv = 
//       styled.div`
//           background-color: ${theme.light.background}
//     `;

//     const themedDiv = styled.div`
//       background-color: black;
//     `

//     return themedDiv;
// }
