import React from 'react';
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

function App() {
  let isAuthenticated = false;
  if (document.cookie != '') {
    isAuthenticated = true;
  }
  return (
    <BrowserRouter>
      <AppContainer>
        <Switch>
          <Route exact path="/" component={Main} />

          {/* {PUBLIC ROUTES} */}
          <Route exact path="/astrologers" component={AstrologerMain} />
          <Route
            exact
            path="/astrologer/:uphone"
            render={(props) => <AstrologerPage {...props} />}
          />
          <Route exact path="/login" component={Login} />
          <Route exact path="/buy-credits" component={Buy_Credits} />
          <Route exact path="/register" component={UserRegister} />
          <Route exact path="/astro-register" component={AstrologerRegister} />
          <Route exact path="/verify-otp" component={VerifyOtp} />
          {/* {PUBLIC ROUTES} */}

          {/* {PRIVATE ROUTES} */}
          <Route
            exact
            path="/room/:roomId"
            render={() =>
              isAuthenticated === true ? <Room /> : <Redirect to="/login" />
            }
          />
          {/* <Route exact path="/room/:roomId" component={Room} /> */}

          <Route
            exact
            path="/payment-records"
            render={() =>
              isAuthenticated === true ? (
                <Payment_Records />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          {/* <Route exact path="/payment-records" component={Payment_Records} /> */}

          <Route
            exact
            path="/getPaymentInfo/:paymentId"
            render={() =>
              isAuthenticated === true ? (
                <Invoice_Main />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          {/* <Route
            exact
            path="/getPaymentInfo/:paymentId"
            component={Invoice_Main}
          /> */}

          <Route
            exact
            path="/profile"
            render={() =>
              isAuthenticated === true ? <Profile /> : <Redirect to="/login" />
            }
          />
          {/* <Route exact path="/profile" component={Profile} /> */}

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
