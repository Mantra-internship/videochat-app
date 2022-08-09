import React from 'react';
import CreditCard from './CreditCard';
import styled from 'styled-components';

function Buy_Credits() {
  let data = [
    {
      credits: 100,
      amount: 500,
      messagesBalance: 25,
      callsBalance: 10,
    },
    {
      credits: 1000,
      amount: 5000,
      messagesBalance: 250,
      callsBalance: 100,
    },
    {
      credits: 50,
      amount: 250,
      messagesBalance: 12,
      callsBalance: 5,
    },
    {
      credits: 200,
      amount: 1000,
      messagesBalance: 50,
      callsBalance: 20,
    },
  ];

  return (
    <Container>
      <Inner>
        <Heading>Buy Credits</Heading>
        {data.map((credit) => {
          return <CreditCard key={credit.credits + 1} credit={credit}></CreditCard>;
        })}
      </Inner>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  justify-items: flex-start;
  align-content: flex-start;
  margin: 20px 40px;
  padding: 30px;
`;

const Inner = styled.div`
  @media (max-width: 768px) {
    .inner_content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      justify-items: center;
      align-content: center;
    }
  }
`;

const Heading = styled.div`
  width: 100%;
  text-align: center;
  font-size: 7vw;
  margin: 0 0 50px 0;
`;

export default Buy_Credits;
