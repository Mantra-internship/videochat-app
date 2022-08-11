import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Nav(props) {
  const [extendNavbar, setExtendNavbar] = useState(false);

  const deleteCookie = (cookieName, cookieValue, daysToExpire) => {
    var date = new Date();
    date.setTime(date.getTime() - daysToExpire * 24 * 60 * 60 * 1000);
    document.cookie =
      cookieName + '=' + cookieValue + '; expires=' + date.toGMTString();
  };

  const handleLogout = () => {
    // document.cookie = 'user=';
    deleteCookie('user', '', 1);
    props.setIsAuthenticated(false);
    window.location.reload();
  };

  let isAuthenticated = props.isAuthenticated;

  return (
    <NavbarContainer extendNavbar={extendNavbar}>
      <NavbarInnerContainer>
        <LeftContainer>
          <NavbarLinkContainer>
            {isAuthenticated ? (
              <>
                <NavbarLink to="/Profile"> Profile</NavbarLink>
                <NavbarLink to="/astrologers"> Astrologers</NavbarLink>
                <NavbarLink to="/payment-records"> Payment Records</NavbarLink>
                <NavbarLink to="/buy-credits"> Buy-credits</NavbarLink>
              </>
            ) : (
              <>
                <NavbarLink to="/login"> Login</NavbarLink>
                <NavbarLink to="/astrologers"> Astrologers</NavbarLink>
                <NavbarLink to="/register"> Register</NavbarLink>
                {/* <NavbarLink to="/Profile"> Profile</NavbarLink> */}
              </>
            )}
            <OpenLinksButton
              onClick={() => {
                setExtendNavbar((curr) => !curr);
              }}
            >
              {extendNavbar ? <>&#10005;</> : <> &#8801;</>}
            </OpenLinksButton>
          </NavbarLinkContainer>
        </LeftContainer>
        <RightContainer>
          <NavbarLink to="/">Logo</NavbarLink>
        </RightContainer>
      </NavbarInnerContainer>
      {extendNavbar && (
        <NavbarExtendedContainer>
          <NavbarLinkExtended to="/"> Home</NavbarLinkExtended>
          <NavbarLinkExtended to="/astrologers">Astrologers</NavbarLinkExtended>
          <NavbarLinkExtended to="/contact"> Contact Us</NavbarLinkExtended>
          <NavbarLinkExtended to="/about"> About Us</NavbarLinkExtended>
        </NavbarExtendedContainer>
      )}
    </NavbarContainer>
  );
}

export default Nav;

const NavbarContainer = styled.nav`
  width: 100%;
  height: ${(props) => (props.extendNavbar ? '100vh' : '80px')};
  background-color: #454552;
  color: white;
  display: flex;
  flex-direction: column;
  @media (min-width: 700px) {
    height: 80px;
  }
`;

const LeftContainer = styled.div`
  flex: 70%;
  display: flex;
  align-items: center;
  padding-left: 5%;
`;

const RightContainer = styled.div`
  flex: 30%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 50px;
`;

const NavbarInnerContainer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
`;

const NavbarLinkContainer = styled.div`
  display: flex;
`;

const NavbarLink = styled(Link)`
  color: white;
  font-size: 18px;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  margin: 10px;
  @media (max-width: 700px) {
    display: none;
  }
`;

const NavbarLinkExtended = styled(Link)`
  color: white;
  font-size: x-large;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  margin: 10px;
`;

// const Logo = styled.img`
//   margin: 10px;
//   max-width: 180px;
//   height: auto;
// `;

const OpenLinksButton = styled.button`
  width: 70px;
  height: 50px;
  background: none;
  border: none;
  color: white;
  font-size: 45px;
  cursor: pointer;
  @media (min-width: 700px) {
    display: none;
  }
`;

const NavbarExtendedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 700px) {
    display: none;
  }
`;
