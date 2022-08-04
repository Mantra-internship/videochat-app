import React from 'react';
import CreditCard from './CreditCard';
import styled from 'styled-components';

function Buy_Credits() {
  return (
    <Container>
      <Inner>
        <Heading>Buy Credits</Heading>
        <CreditCard></CreditCard>
        <CreditCard></CreditCard>
        <CreditCard></CreditCard>
        <CreditCard></CreditCard>
        <CreditCard></CreditCard>
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
