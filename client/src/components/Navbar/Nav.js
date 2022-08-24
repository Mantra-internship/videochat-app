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
    sessionStorage.removeItem('user');
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
                <Button2
                  style={{ fontSize: 'large', padding: '0' }}
                  onClick={handleLogout}
                >
                  Logout
                </Button2>
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
          <NavbarLink to="/">VideoChat App</NavbarLink>
        </RightContainer>
      </NavbarInnerContainer>
      {extendNavbar && (
        <NavbarExtendedContainer>
          {isAuthenticated ? (
            <>
              <NavbarLinkExtended to="/">
                <Button onClick={() => setExtendNavbar(false)}>Home</Button>
              </NavbarLinkExtended>
              <NavbarLinkExtended to="/Profile">
                <Button onClick={() => setExtendNavbar(false)}>Profile</Button>
              </NavbarLinkExtended>
              <NavbarLinkExtended to="/astrologers">
                <Button onClick={() => setExtendNavbar(false)}>
                  Astrologers
                </Button>
              </NavbarLinkExtended>
              <NavbarLinkExtended to="/payment-records">
                <Button onClick={() => setExtendNavbar(false)}>
                  Payment Records
                </Button>
              </NavbarLinkExtended>
              <NavbarLinkExtended to="/buy-credits">
                <Button onClick={() => setExtendNavbar(false)}>
                  Buy Credits
                </Button>
              </NavbarLinkExtended>
              <Button onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <NavbarLinkExtended to="/">
                <Button onClick={() => setExtendNavbar(false)}>Home</Button>
              </NavbarLinkExtended>
                <NavbarLinkExtended to="/login">
                  <Button onClick={() => setExtendNavbar(false)}>Login</Button>
                </NavbarLinkExtended>
              <NavbarLinkExtended to="/astrologers">
                <Button onClick={() => setExtendNavbar(false)}>
                  Astrologers
                </Button>
              </NavbarLinkExtended>
              <NavbarLinkExtended to="/register">
                <Button onClick={() => setExtendNavbar(false)}>
                  Register
                </Button>
              </NavbarLinkExtended>
            </>
          )}
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
  align-items: center;
  flex-direction: column;
  // position: absolute;
  z-index: 100;
  @media (min-width: 900px) {
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
  @media (max-width: 900px) {
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

const Button = styled.button`
  color: white;
  background: #454552;
  font-size: x-large;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  margin: 10px;
  border: none;
  outline: none;
  cursor: pointer;
`;

const Button2 = styled.button`
  color: white;
  background: #454552;
  font-family: Arial, Helvetica, sans-serif;
  margin: 10px;
  border: none;
  outline: none;
  font-size: large;
  cursor: pointer;
  padding: 0;
  @media (max-width: 900px) {
    display: none;
  }
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
  @media (min-width: 900px) {
    display: none;
  }
`;

const NavbarExtendedContainer = styled.div`
  postion: absolute;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 900px) {
    display: none;
  }
`;
