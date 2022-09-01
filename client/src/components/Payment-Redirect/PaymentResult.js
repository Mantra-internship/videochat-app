import React, { useRef, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components';
import axios from 'axios';

const Main = (props) => {
  document.title = 'Payment Result';
  const roomRef = useRef();
  // const userRef = useRef();
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [loader, setLoader] = useState(true);
  const [isSuccess, setIsSuccess] = useState(true)

  useEffect(() => {
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
    paymentResultFetecher()
  }, []);


  const paymentResultFetecher = async () => {
    let payment_id, payment_request_id, payment_status;
    let queryString = props.location.search;
    queryString = queryString.substr(1);
    queryString.split('&').forEach((str) => {
      str = str.split('=')
      if(str[0] == 'payment_id') payment_id = str[1];
      else if (str[0] == 'payment_request_id') payment_request_id = str[1];
      else if (str[0] == 'payment_status') payment_status = str[1];
    })

    if (!payment_id) {
      setIsSuccess(false)
    }

    await axios.get(`http://localhost:5000/api/payment/check-payment/?payment_id=${payment_id}&payment_status=${payment_status}&payment_request_id=${payment_request_id}`)
    .then((response) => {
      console.log(response.data);
      console.log(response.data.paymentDetails.paymentRequestId);
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <Container>
      <MainContainer>
        <h1>{isSuccess ? 'Payment Successful' : 'Payment Failed'}</h1> 
        <Link to="/">Go to Home</Link>
      </MainContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
`;

const MainContainer = styled.div`

  display: flex;
  flex-direction: column;
`;

export default Main;
