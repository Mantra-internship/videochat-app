import React from 'react';
import styled from 'styled-components';
import Phone from './Phone';

function UserProfile({
  data,
  nameRef,
  emailRef,
  setRole,
  getToken
}) {

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
          defaultValue={data.name}
          ref={nameRef}
        />
      </Row>
      <Row>
        <Label htmlFor="e-mail">E-Mail</Label>
        <Input
          type="e-mail"
          id="e-mail"
          default="NULL"
          placeholder="John@example.com"
          defaultValue={data.email}
          ref={emailRef}
        />
      </Row>
      <Phone 
        phone={data.phone}
        getToken={getToken}
      />
      <Row>
        <Label htmlFor="role">Role</Label>
        <Select
          defaultValue={data.role}
          onChange={(event) => setRole(event.target.value)}
        >
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

// const Textarea = styled.textarea`
//   height: 70px;
//   width: 250px;
//   resize: none;
//   font-size: 20px;
//   outline: none;
//   margin-left: 15px;
//   padding-left: 10px;
//   border: none;
//   border-radius: 5px;

//   @media (max-width: 500px) {
//     width: 200px;
//   }
// `;

export default UserProfile;
