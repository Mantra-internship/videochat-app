import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

function VerifyOtp(props) {
  const [otp, setOtp] = useState();

  const role = sessionStorage.getItem('role');

  // axios request to sava a new astrologer or user depending on the role.
  let data = {
    otp,
    phone: sessionStorage.getItem('phone'),
  };

  const otpValidater = async () => {
    await axios
      .post('http://localhost:5000/api/user/verify-otp', data)
      .then((response) => {
        console.log(response.data);
        document.cookie = `user=${response.data.token}`;
        if (role === 'user' || role === '') {
          props.history.push('/');
        } else {
          props.history.push('/astro-register');
        }
      })
      .catch((err) => {
        console.log(err);
        alert('Something went wrong');
      });
  };

  return (
    <>
      <MainContainer>
        <Heading>Verify OTP</Heading>
        <Inner>
          <Row>
            <Label htmlFor="otp">One Time Password</Label>
            <Input
              type="number"
              id="otp"
              placeholder="XXXX"
              onChange={(event) => setOtp(event.target.value)}
            />
          </Row>
        </Inner>
        <SendButton onClick={otpValidater}>Verify OTP</SendButton>
      </MainContainer>
    </>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  height: 100vh;
  width: 40vw;

  @media (max-width: 900px) {
    width: 90%;
    margin: 30px 30px;
  }
`;

const Heading = styled.div`
  width: 100%;
  text-align: center;
  font-size: 7vw;
  margin: 20px 0;
`;

const Inner = styled.div`
  margin-top: 80px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
  line-height: 35px;
`;

const Label = styled.label``;

const Input = styled.input`
  width: 180px;
  height: 35px;
  margin-left: 15px;
  padding-left: 10px;
  outline: none;
  border: none;
  border-radius: 5px;
`;

const SendButton = styled.button`
  height: 40px;
  margin-top: 35px;
  outline: none;
  border: none;
  border-radius: 15px;
  color: #d8e9ef;
  background-color: #4ea1d3;
  font-size: 25px;
  font-weight: 500;

  :hover {
    background-color: #7bb1d1;
    cursor: pointer;
  }
`;

export default VerifyOtp;
