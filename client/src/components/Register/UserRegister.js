import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import 'react-phone-input-2/lib/style.css';
// import PhoneInput from 'react-phone-input-2';

function UserRegister() {
  const [name, setName] = useState();
  const [email, setEmail] = useState('NULL');
  const [phone, setPhone] = useState();
  const [role, setRole] = useState();

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const options = [
    { label: 'Astrologer', value: 'astrologer' },
    { label: 'User', value: 'user' },
  ];

  return (
    <>
      <MainContainer>
        <Heading>Register</Heading>
        <Inner>
          <Row>
            <Label htmlFor="Name">Full Name</Label>
            <Input
              type="text"
              id="Name"
              required
              placeholder="John Doe"
              onChange={(event) => setName(event.target.value)}
            />
          </Row>
          <Row>
            <Label htmlFor="e-mail">E-Mail</Label>
            <Input
              type="e-mail"
              id="e-mail"
              default="NULL"
              placeholder="John@example.com"
              onChange={(event) => setEmail(event.target.value)}
            />
          </Row>
          <Row>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              type="phone"
              id="phone"
              placeholder="+91XXXXXXXXXX"
              onChange={(event) => setPhone(event.target.value)}
            />
            {/* <PhoneInput
              id="phone"
              required
              placeholder="+91XXXXXXXXXX"
              value={phone}
              onChange={setPhone}
              style={{
                width: '30px',
                height: '35px',
                marginLeft: '5px',
                outline: 'none',
                border: 'none',
                borderRadius: '5px',
              }}
            /> */}
          </Row>
          <Row>
            <Label htmlFor="role">Role</Label>
            <Select value={role} onChange={handleChange}>
              <option value="" selected disabled hidden>
                Are you a Astrologer or User?
              </option>
              {options.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </Select>
          </Row>
        </Inner>
        <SendButton>Send OTP</SendButton>
      </MainContainer>
    </>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  height: 100vh;
  width: 50vw;

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
  width: 200px;
  height: 35px;
  margin-left: 15px;
  padding-left: 10px;
  outline: none;
  border: none;
  border-radius: 5px;

  @media (min-width: 900px) {
    width: 250px;
  }
`;

const Select = styled.select`
  width: 210px;
  height: 35px;
  margin-left: 15px;
  padding-left: 10px;
  outline: none;
  border: none;
  border-radius: 5px;

  @media (min-width: 900px) {
    width: 260px;
  }
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

export default UserRegister;
