import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

function CreditCard({ credit }) {
  let history = useHistory();
  const [paymentLink, setPaymentLink] = useState('#');
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

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };

  // axios request to make payment with amount
  const createPayment = async () => {
    await axios
      .post(
        'https://video-chat-backend99.herokuapp.com/api/payment/create-payment',
        { amount: credit.amount },
        {
          headers: { authorization: `Bearer ` + getToken() },
        }
      )
      .then((res) => {
        console.log(res.data.paymentLink);
        setPaymentLink(res.data.paymentLink);
        // history.push(res.data.paymentLink);
        console.log(paymentLink);
        openInNewTab(res.data.paymentLink);
      })
      .catch((error) => {
        console.log(error);
        setPaymentLink('#');
      });
  };

  return (
    <Cards>
      <h2 style={{ textAlign: 'center' }}>{credit.credits} Credit</h2>
      <h3 style={{ textAlign: 'center', margin: '0' }}>
        &#8377; {credit.amount}
      </h3>
      <h3 style={{ textAlign: 'center', margin: '0' }}>
        {credit.messagesBalance} messages
      </h3>
      <h3 style={{ textAlign: 'center', margin: '0' }}>
        {credit.callsBalance} Calls
      </h3>
      <button
        onClick={createPayment}
        style={{
          padding: '10px 20px',
          margin: '5px 0',
          cursor: 'pointer',
          fontSize: '25px',
        }}
      >
        Buy
      </button>
    </Cards>
  );
}

const Cards = styled.div`
  display: inline-block;
  height: 300px;
  width: 300px;
  border: 2px solid #ccc;
  border-radius: 15px;
  margin: 20px;
  transition: 500ms;
  font-size: 24px;

  :hover {
    border-color: blanchedalmond;
  }
`;

export default CreditCard;
