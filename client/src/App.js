import React, { useState, useEffect } from 'react';
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
import axios from 'axios';

function App(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
    if (jwtToken == null) {
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
        console.log(resObj);
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
    console.log('isAuthenticated', isAuthenticated);
  };

  return (
    <BrowserRouter>
      <Navbar
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <AppContainer>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Main {...props} isAuthenticated={isAuthenticated} />
            )}
          />

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
            render={() =>
              isAuthenticated ? <Redirect to="/" /> : <UserRegister />
            }
          />
          <Route
            exact
            path="/astro-register"
            render={() =>
              isAuthenticated ? <Redirect to="/" /> : <AstrologerRegister />
            }
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
            render={() =>
              isAuthenticated ? <Room /> : <Redirect to="/login" />
            }
          />
          <Route
            exact
            path="/buy-credits"
            render={() =>
              isAuthenticated ? <Buy_Credits /> : <Redirect to="/login" />
            }
          />

          <Route
            exact
            path="/payment-records"
            render={() =>
              isAuthenticated ? <Payment_Records /> : <Redirect to="/login" />
            }
          />

          <Route
            exact
            path="/getPaymentInfo/:paymentId"
            render={() =>
              isAuthenticated ? <Invoice_Main /> : <Redirect to="/login" />
            }
          />

          <Route
            exact
            path="/profile"
            render={() =>
              isAuthenticated ? <Profile /> : <Redirect to="/login" />
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
  justify-content: center;
  font-size: calc(8px + 2vmin);
  color: white;
  background-color: #454552;
  text-align: center;
`;

export default App;
