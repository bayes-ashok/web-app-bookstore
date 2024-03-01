import React from "react";
import styled from "styled-components";

const NavbarContainer = styled.nav`
  background-color: #F3F4F6; /* Light background color */
  color: #333; /* Dark text color */
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavbarTitle = styled.div`
  font-size: 1.5rem;
`;

const NavbarMenu = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
`;

const NavbarItem = styled.li`
  margin-right: 20px;
`;

const NavbarLink = styled.a`
  text-decoration: none;
  color: inherit;
  transition: color 0.3s ease;

  &:hover {
    color: #007bff; /* Blue color on hover */
  }
`;

const AdminNav: React.FC = () => {
  return (
    <NavbarContainer>
      <NavbarTitle>BOOKSTORE-ADMIN</NavbarTitle>
      <NavbarMenu>
        <NavbarItem>
          <NavbarLink href="/admin-dashboard">
            <i className="fas fa-qrcode" />
            Home
          </NavbarLink>
        </NavbarItem>
        <NavbarItem>
          <NavbarLink href="/addbook">
            <i className="fas fa-plus-square" />
            Add
          </NavbarLink>
        </NavbarItem>
        <NavbarItem>
          <NavbarLink href="/all-order">
            <i className="fas fa-shopping-cart" />
            Order
          </NavbarLink>
        </NavbarItem>
        <NavbarItem>
          <NavbarLink
            href="/"
            onClick={() => {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("id");
              localStorage.removeItem("name");
            }}
          >
            <i className="fas fa-times" />
            Logout
          </NavbarLink>
        </NavbarItem>
      </NavbarMenu>
    </NavbarContainer>
  );
};

export default AdminNav;
