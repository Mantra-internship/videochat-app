import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Payment_records = (props) => {
  const [transactionData, setTransactionData] = useState([]);
  const [loader, setLoader] = useState(true);
  // const [token, setToken] = useState("");

  useEffect(() => {
    transactionDataFetcher();
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

  const transactionDataFetcher = async () => {
    await axios
      .post(
        'http://localhost:5000/api/user/payment-record',
        {},
        {
          headers: { authorization: `Bearer ` + getToken() },
        }
      )
      .then((resObj) => {
        // console.log(resObj.data);
        setTransactionData(resObj.data.paymentRecord);
        setLoader(false);
        // console.log(transactionData);
      })
      .catch((error) => {
        console.log(error);
        setTransactionData([]);
      });
  };

  if (transactionData.length === 0)
    return (
      <>
        <Heading>Transaction history</Heading>
        <Container>
          {/* <div>No Transaction History</div> */}
          {loader ? (
            <Inner>
              <h3>Loading...</h3>
            </Inner>
          ) : (
            <>
              <div>No Transaction History</div>
            </>
          )}
        </Container>
      </>
    );

  return (
    <>
      <Heading>Transaction history</Heading>
      <Container>
        {loader ? (
          <Inner>
            <h3>Loading...</h3>
          </Inner>
        ) : (
          <>
            {transactionData.map((record) => {
              return (
                <Card key={record.paymentRequestId}>
                  <p>Name - {record.name}</p>
                  <p>Phone - {record.phone}</p>
                  <p>Payment Request Status - {record.paymentRequestStatus}</p>
                  <p>Amount - {record.amount}</p>
                  <p>Payment Request ID - {record.paymentRequestId}</p>
                  {record.paymentRequestStatus === 'Pending' ? (
                    <Button
                    // style={{
                    //   padding: '5px 15px',
                    //   margin: '5px 0',
                    // }}
                    >
                      <a
                        style={{
                          textDecoration: 'none',
                          color: 'white',
                          fontSize: '15px',
                        }}
                        href={record.paymentLink}
                      >
                        Continue Payment
                      </a>
                    </Button>
                  ) : (
                    <></>
                  )}
                  {record.paymentRequestStatus !== 'Pending' ? (
                    <Button
                    // style={{
                    //   padding: '5px 15px',
                    //   margin: '5px 0',
                    // }}
                    >
                      <a
                        style={{
                          textDecoration: 'none',
                          color: 'white',
                          fontSize: '15px',
                        }}
                        href={`/getPaymentInfo/${record.paymentId}`}
                      >
                        InVoice
                      </a>
                    </Button>
                  ) : (
                    <></>
                  )}
                </Card>
              );
            })}
          </>
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 30px;
  overflow: hidden;
  margin-top: 30px;
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
  border-radius: 10px;
  margin: 20px;
  padding: 10px;
  font-size: 18px;
  height: 350px;
  width: 350px;

  @media (max-width: 800px) {
    width: 350px;
  }

  > p {
    // padding: 10px;
  }
`;

const Button = styled.button`
  height: 50px;
  // margin-top: 35px;
  outline: none;
  border: none;
  border-radius: 15px;
  padding: 10px 20px;
  color: #d8e9ef;
  background-color: #4ea1d3;
  font-size: 20px;
  font-weight: 500;

  :hover {
    background-color: #7bb1d1;
    cursor: pointer;
  }
`;

const Inner = styled.div`
  margin-top: 20px;
`;

export default Payment_records;
