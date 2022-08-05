import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
// import 'react-phone-input-2/lib/style.css';
// import PhoneInput from 'react-phone-input-2';

import UserProfile from './UserProfile';
import AstroProfile from './AstroProfile';

function Profile(props) {
  const [name, setName] = useState();
  const [email, setEmail] = useState('NULL');
  const [phone, setPhone] = useState();
  const [role, setRole] = useState();
  const [speciality, setSpeciality] = useState('');
  const [languages, setLanguages] = useState('');
  const [description, setDescription] = useState('');
  const [experience, setExperience] = useState('');

  let designation = sessionStorage.getItem('role');

  useEffect(() => {
    getToken();
    getData();
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

  let data = {
    name,
    email,
    phone,
    role,
    speciality,
    languages,
    description,
    experience,
  };

  const setData = (data) => {
    setName(data.name);
    setEmail(data.email);
    setPhone(data.phone);
    setRole(data.role);
    setSpeciality(data.astrologerInfo.specialities);
    setLanguages(data.astrologerInfo.languages);
    setDescription(data.astrologerInfo.description);
    setExperience(data.astrologerInfo.experience);
  };

  const getData = async () => {
    await axios
      .post(
        'http://localhost:5000/api/user/get-user',
        {},
        {
          headers: { authorization: `Bearer ` + getToken() },
        }
      )
      .then((response) => {
        console.log(response.data.foundUser);
        setData(response.data.foundUser);
      })
      .catch((err) => {
        console.log(err);
        alert('Something went wrong');
      });
  };

  const postData = async () => {
    console.log({ data });
    await axios
      .post(
        'http://localhost:5000/api/user/update',
        {
          data,
        },
        {
          headers: { authorization: `Bearer ` + getToken() },
        }
      )
      .then((response) => {
        console.log(response);
        alert('Updated Successfully');
      })
      .catch((err) => {
        console.log(err);
        alert('Something went wrong');
      });
  };

  return (
    <>
      <MainContainer>
        <Heading>Profile</Heading>
        <Inner>
          <UserProfile props={data} setData={setData} />
          <AstroProfile props={data} setData={setData} />
        </Inner>
        <SendButton onClick={postData}>Update Data</SendButton>
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
  overflow: hidden;

  @media (max-width: 1050px) {
    width: 90%;
  }
`;

const Heading = styled.div`
  width: 100%;
  text-align: center;
  font-size: 7vw;
  margin: 10px 0;
`;

const Inner = styled.div`
  margin-top: 20px;
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

export default Profile;
