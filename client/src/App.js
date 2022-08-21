import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Main from './components/Main/Main';
import Room from './components/Room/Room';
import Payment_Records from './components/Payments/Payment-Records';
import styled from 'styled-components';

import Invoice_Main from './components/Transaction_Invoice/Invoice_Main';
import AstrologerMain from './components/Astrologer/AstrologerMain';
import AstrologerPage from './components/Astrologer/AstrologerPage';
import Buy_Credits from './components/CreditsPage/Buy_Credits';
import Login from './components/Login/Login';
import UserRegister from './components/Register/UserRegister';
import AstrologerRegister from './components/Register/AstrologerRegister';
import VerifyOtp from './components/Register/VerifyOtp';
import Profile from './components/Profile/Profile';
import PageNotFound from './components/PageNotFound/PageNotFound';

import Navbar from './components/Navbar/Navbar';
import Nav from './components/Navbar/Nav';
import Navbar2 from './components/Navbar/Navbar2';
import axios from 'axios';

function App(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const stream = useRef(false);
  useEffect(() => {
    checkAuth();
  }, []);

  const getToken = () => {
    const cArray = document.cookie.split(' ');
    let anotherToken;
    cArray.map((string) => {
      let sArray = string.split('=');
      if (sArray[0] === 'user') {
        anotherToken = sArray[1];
        if (anotherToken[anotherToken.length - 1] === ';') {
          anotherToken = anotherToken.slice(0, -1);
        }
      }
    });
    return anotherToken;
  };

  const checkAuth = async () => {
    const jwtToken = document.cookie;
    if (jwtToken == '') {
      setIsAuthenticated(false);
      return;
    }

    // console.log({ token });

    await axios
      .post(
        'http://localhost:5000/api/user/authenticate-user',
        {},
        {
          headers: { authorization: `Bearer ` + getToken() },
        }
      )
      .then((resObj) => {
        // console.log(resObj);
        if (resObj.data.isAuthenticated) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsAuthenticated(false);
      });
    // console.log('isAuthenticated', isAuthenticated);
  };

  return (
    <BrowserRouter>
      {/* <Navbar
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      /> */}
      <Nav
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      {/* <Navbar2
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      /> */}
      <AppContainer>
        <Switch>
          <Route exact path="/" render={(props) => <Main {...props} stream={stream} />} />

          {/* {PUBLIC ROUTES} */}
          <Route exact path="/astrologers" component={AstrologerMain} />
          <Route
            exact
            path="/astrologer/:uphone"
            render={(props) => <AstrologerPage {...props} />}
          />
          <Route
            exact
            path="/login"
            render={(props) =>
              isAuthenticated ? <Redirect to="/" /> : <Login {...props} />
            }
          />

          <Route
            exact
            path="/register"
            render={(props) =>
              isAuthenticated ? (
                <Redirect to="/" />
              ) : (
                <UserRegister {...props} />
              )
            }
          />
          <Route
            exact
            path="/astrologer-register"
            render={(props) => <AstrologerRegister {...props} />}
          />
          <Route
            exact
            path="/verify-otp"
            render={(props) =>
              isAuthenticated ? (
                <Redirect to="/" />
              ) : (
                <VerifyOtp {...props} checker={setIsAuthenticated} />
              )
            }
          />
          {/* {PUBLIC ROUTES} */}

          {/* {PRIVATE ROUTES} */}
          <Route
            exact
            path="/room/:roomId"
            render={(props) =>
              !isAuthenticated ? <Redirect to="/login"/> : (stream.current ? <Room {...props} stream={stream.current} /> : <Redirect to="/" />)
            }
          />
          <Route
            exact
            path="/buy-credits"
            render={(props) =>
              isAuthenticated ? (
                <Buy_Credits {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />

          <Route
            exact
            path="/payment-records"
            render={(props) =>
              isAuthenticated ? (
                <Payment_Records {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />

          <Route
            exact
            path="/getPaymentInfo/:paymentId"
            render={(props) => <Invoice_Main {...props} />}
          />

          <Route
            exact
            path="/profile"
            render={(props) =>
              isAuthenticated ? (
                <Profile {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />

          {/* No Page Found Component */}
          <Route component={PageNotFound} />
        </Switch>
      </AppContainer>
    </BrowserRouter>
  );
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
  // margin-top: 100px;
  justify-content: center;
  font-size: calc(8px + 2vmin);
  color: white;
  background-color: #454552;
  text-align: center;
  // @media(max-width: 768px) {
  //   margin-top: 150px;
  // }
`;

export default App;
