import React from 'react';
import styled from 'styled-components';

function CreditCard() {
  return (
    <Cards>
      <h2 Style={{ textAlign: 'center' }}>100 Credit</h2>
      <h3 Style={{ textAlign: 'center', margin: '0' }}>&#8377; Amount</h3>
      <h3 Style={{ textAlign: 'center', margin: '0' }}>200 mins</h3>
      <h3 Style={{ textAlign: 'center', margin: '0' }}>45 Calls</h3>
      <h3>200 messages</h3>
    </Cards>
  );
}

const Cards = styled.div`
  display: inline-block;
  height: 300px;
  width: 300px;
  border: 2px solid #ccc;
  border-radius: 5px;
  margin: 20px;
  transition: 500ms;
  font-size: 20px;

  :hover {
    border-color: blanchedalmond;
  }
`;

export default CreditCard;
