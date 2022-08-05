import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

function UserProfile(props) {
  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const options = [
    { label: 'Astrologer', value: 'astrologer' },
    { label: 'User', value: 'user' },
  ];

  return (
    <>
      <Row>
        <Label htmlFor="Name">Full Name</Label>
        <Input
          type="text"
          id="Name"
          required
          placeholder="John Doe"
          value={props.name} // to be changed to dynamic content
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
          value={props.email} // to be changed to dynamic content
          onChange={(event) => setEmail(event.target.value)}
        />
      </Row>
      <Row>
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          type="phone"
          id="phone"
          placeholder="+91XXXXXXXXXX"
          value={props.phone} // to be changed to dynamic content
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
        <Select
          value={props.role} // to be changed to dynamic content
          onChange={handleChange}
          defaultValue="Are you a Astrologer or a User"
        >
          {/* <option value="" selected disabled hidden>
                Are you a Astrologer or User?
              </option> */}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </Row>
    </>
  );
}

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
  line-height: 35px;
`;

const Label = styled.label``;

const Input = styled.input`
  width: 250px;
  height: 35px;
  margin-left: 15px;
  padding-left: 10px;
  outline: none;
  border: none;
  border-radius: 5px;

  @media (max-width: 500px) {
    width: 200px;
  }
`;

const Select = styled.select`
  width: 260px;
  height: 35px;
  margin-left: 15px;
  padding-left: 10px;
  outline: none;
  border: none;
  border-radius: 5px;

  @media (max-width: 500px) {
    width: 210px;
  }
`;

const Textarea = styled.textarea`
  height: 70px;
  width: 250px;
  resize: none;
  font-size: 20px;
  outline: none;
  margin-left: 15px;
  padding-left: 10px;
  border: none;
  border-radius: 5px;

  @media (max-width: 500px) {
    width: 200px;
  }
`;

export default UserProfile;
