import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface DecodedToken {
  roles?: string[];
  // other token properties
}

const NavbarContainer = styled.nav`
  background-color: #f5f5f5; /* Semi-transparent white background */
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative; /* Added to make BurgerMenu absolute position correctly */
`;

const MenuList = styled.ul<{ isMobileMenuOpen: boolean }>`
  list-style: none;
  padding: 0;
  display: flex;
  align-items: center;
  margin-top: 10px; /* Added to create space between app name and menu on mobile */

  @media (max-width: 768px) {
    display: ${(props) => (props.isMobileMenuOpen ? "flex" : "none")};
    position: absolute;
    top: calc(80%); /* Position just below NavbarContainer */
    left: 0;
    width: 100%;
    background-color: #fff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    flex-direction: column; /* Change direction on mobile */
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
`;

const MenuItem = styled.li`
   @media (max-width: 768px) {
    margin-left: 0; /* Remove margin to make all items left-aligned */
    margin-top: 5px;
    margin-bottom: 10px;
    width: 100%;
  }
`;

const MenuLink = styled.a`
  text-decoration: none;
  color: #333; /* Dark color for menu links */
  padding: 10px 15px;
  border-radius: 5px;
  transition: color 0.3s ease; /* Change transition to affect only color */

  &:hover {
    color: blue; /* Change text color on hover */
  }
`;


const AppName = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  color: #333; /* Dark color for app name */
`;

interface LoginButtonProps {
  isLoggedIn: boolean;
}

const LoginButton = styled.button<LoginButtonProps>`
  background-color: ${(props) => (props.isLoggedIn ? "#333" : "blue")};
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.isLoggedIn ? "#222" : "darkblue")};
  }
  @media (max-width: 768px) {
    margin-left: 15px;
    
  }
`;

const BurgerMenu = styled.div`
  display: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 999; /* Ensure it's above the menu */
    transition: transform 0.3s ease; /* Added transition */
  }

  svg {
    fill: #333;
    transition: fill 0.3s ease; /* Added transition */
  }

  &:hover {
    svg {
      fill: darkgrey; /* Change color on hover */
    }
  }

  /* Apply transform to create burger animation */
  &.open {
    svg:first-child {
      transform: rotate(45deg);
    }

    svg:nth-child(2) {
      opacity: 0;
    }

    svg:last-child {
      transform: rotate(-45deg);
    }
  }
`;

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    setIsLoggedIn(accessToken !== null);
  }, []);

  const handleLoginRedirect = () => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      const decodedToken = parseJwt(accessToken);
      console.log('Decoded Token:', decodedToken);

      if (decodedToken.roles && decodedToken.roles.includes("admin")) {
        window.location.href = "/admin-dashboard";
      } else {
        window.location.href = "/";
      }
    } else {
      window.location.href = "/login";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    setIsLoggedIn(false);
  };

  const parseJwt = (token: string) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`)
        .join('')
    );

    return JSON.parse(jsonPayload) as DecodedToken;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <NavbarContainer>
      <AppName>Book Store</AppName>
      <BurgerMenu className={isMobileMenuOpen ? "open" : ""} onClick={toggleMobileMenu}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            fill="#333"
            d="M4 6h16c.55 0 1 .45 1 1s-.45 1-1 1H4c-.55 0-1-.45-1-1s.45-1 1-1zm0 5h16c.55 0 1 .45 1 1s-.45 1-1 1H4c-.55 0-1-.45-1-1s.45-1 1-1zm0 5h16c.55 0 1 .45 1 1s-.45 1-1 1H4c-.55 0-1-.45-1-1s.45-1 1-1z"
          />
        </svg>
      </BurgerMenu>
      <MenuList isMobileMenuOpen={isMobileMenuOpen}>
        <MenuItem>
          <MenuLink href="/">Home</MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink href="/order">Order Cart</MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink href="/myaccount">My Account</MenuLink>
        </MenuItem>
        {isLoggedIn ? (
          <MenuItem>
            <LoginButton 
  style={{ backgroundColor: isLoggedIn ? '#f5f5f5' : 'blue', color: isLoggedIn ? 'black' : 'blue' }}
              isLoggedIn={isLoggedIn}
              onClick={handleLogout}
            >
              Logout
            </LoginButton>
          </MenuItem>
        ) : (
          <MenuItem>
            <LoginButton
              isLoggedIn={isLoggedIn}
              onClick={handleLoginRedirect}
            >
              Login
            </LoginButton>
          </MenuItem>
        )}
      </MenuList>
    </NavbarContainer>
  );
};

export default Navbar;
