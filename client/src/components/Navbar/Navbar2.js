import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const Navbar2 = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Nav>
      <Logo to="/">Home</Logo>
      <Hamburger onClick={() => setIsOpen(!isOpen)}>
        <span />
        <span />
        <span />
      </Hamburger>
      <Menu isOpen={isOpen}>
        <MenuLink to="/astrologers">Astrologers</MenuLink>
        <MenuLink to="/payment-records">Payment Records</MenuLink>
        <MenuLink to="/profile">Profile</MenuLink>
        <MenuLink to="/buy-credits">Buy Credits</MenuLink>
      </Menu>
    </Nav>
  );
};

export default Navbar2;

const MenuLink = styled(Link)`
  padding: .5rem 1rem;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  color: white;
  transition: all 0.3s ease-in;
  font-size: 1.5rem;
  &:hover {
    color: #7b7fda;
  }
`;

const Nav = styled.div`
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
//   margin-bottom: 2rem;
  background: #454552;
  color: white;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const Logo = styled(Link)`
  padding: 1rem 0;
  color: white;
  text-decoration: none;
  font-weight: 800;
  font-size: 1.7rem;
  span {
    font-weight: 300;
    font-size: 1.3rem;
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-bottom: 100px;
  @media (max-width: 768px) {
    overflow: hidden;
    flex-direction: column;
    max-height: ${({ isOpen }) => (isOpen ? '200px' : '0')};
    transition: max-height 0.3s ease-in;
    width: 100%;
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  span {
    height: 2px;
    width: 25px;
    background: white;
    margin-bottom: 4px;
    border-radius: 5px;
  }
  @media (max-width: 768px) {
    display: flex;
  }
`;
