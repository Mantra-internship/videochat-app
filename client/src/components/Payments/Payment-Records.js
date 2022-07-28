import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Payment_records = (props) => {
  const [transactionData, setTransactionData] = useState([0]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const temp = setTimeout(transactionDataFetcher(), 1000);
  }, []);

  // To be tested
  const transactionDataFetcher = async () => {
    const cArray = document.cookie.split(' ');
    cArray.forEach((string) => {
      let sArray = string.split('=');
      if (sArray[0] === 'user') {
        // To be Updated (replace atob or shift functionality to backend for buffer use)
        setUserId(
          atob(sArray[1].split('.')[1].replace('-', '+').replace('_', '/')).id
        );
      }
    });
    await axios
      .post('http://localhost:5000/api/user/payment-record', {
        header: { Authorization: `Bearer ${userId}` },
      })
      .then((resObj) => {
        setTransactionData(resObj.data.paymentRecord);
        console.log(transactionData);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Heading>Transaction history</Heading>
      <Container>
        {transactionData.map((record) => {
          return (
            <Card>
              <p>Name - {record.name}</p>
              <p>Phone - {record.phone}</p>
              <p>Payment Request Status - {record.paymentRequestStatus}</p>
              <p>Amount - {record.amount}</p>
              <p>Payment Request ID - {record.paymentRequestId}</p>
              {record.paymentRequestStatus === 'Pending' ? (
                <button
                  style={{
                    padding: '5px 15px',
                    margin: '5px 0',
                  }}
                >
                  <a
                    style={{
                      textDecoration: 'none',
                      color: '#000',
                      fontSize: '15px',
                    }}
                    href={record.paymentLink}
                  >
                    Continue Payment
                  </a>
                </button>
              ) : (
                <></>
              )}
              {record.paymentRequestStatus !== 'Pending' ? (
                <button
                  style={{
                    padding: '5px 15px',
                    margin: '5px 0',
                  }}
                >
                  <a
                    style={{
                      textDecoration: 'none',
                      color: '#000',
                      fontSize: '15px',
                    }}
                    href={`\getPaymentInfo\${record.paymentId}`}
                  >
                    InVoice
                  </a>
                </button>
              ) : (
                <></>
              )}
            </Card>
          );
        })}
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  padding: 30px;
`;

const Heading = styled.div`
  width: 100%;
  text-align: center;
  font-size: 7vw;
  margin: 20px 0;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border: solid 1px #fff;
  borderradius: 10px;
  margin: 20px;
  padding: 20px;
  font-size: 18px;

  > p {
    // padding: 10px;
  }
`;

export default Payment_records;
