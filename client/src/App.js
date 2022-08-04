import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './components/Main/Main';
import Room from './components/Room/Room';
import Payment_Records from './components/Payments/Payment-Records';
// import NotFound from "./components/NotFound/NotFound";
import styled from 'styled-components';

import Invoice_Main from './components/Transaction_Invoice/Invoice_Main';
import AstrologerMain from './components/Astrologer/AstrologerMain';
import AstrologerPage from './components/Astrologer/AstrologerPage';
import Buy_Credits from './components/CreditsPage/Buy_Credits'
import Login from './components/Login/Login'
import UserRegister from './components/Register/UserRegister'
import AstrologerRegister from './components/Register/AstrologerRegister'
import VerifyOtp from './components/Register/VerifyOtp'
import Profile from './components/Profile/Profile'

function App() {
  return (
    <BrowserRouter>
      <AppContainer>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/room/:roomId" component={Room} />
          <Route exact path="/payment-records" component={Payment_Records} />
          {/* <Route component={NotFound} /> */}
          <Route
            exact
            path="/getPaymentInfo/:paymentId"
            component={Invoice_Main}
          />
          <Route exact path="/astrologers" component={AstrologerMain} />
          <Route
            exact
            path="/astrologer/:uphone"
            render={(props) => <AstrologerPage {...props} />}
          />
          <Route exact path="/buy-credits" component={Buy_Credits} />
          <Route exact path="/login" component={Login} />
          {/* Register Routes */}
          <Route exact path="/register" component={UserRegister} />
          {/* <Route exact path="/register" component={AstrologerRegister} /> */}
          {/* <Route exact path="/register" component={VerifyOtp} /> */}

          {/* Login Routes */}
          <Route exact path="/login" component={Login} />
          {/* <Route exact path="/login" component={VerifyOtp} /> */}

          {/* Profile Routes */}
          <Route exact path="/profile" component={Profile} />
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
