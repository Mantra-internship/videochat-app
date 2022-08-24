import React, { useState, useEffect, useRef } from 'react';
import {useHistory} from 'react-router-dom'
import styled from 'styled-components';
import axios from 'axios';
import UserProfile from './UserProfile';
import AstroProfile from './AstroProfile';

function Profile(props) {
  document.title = 'Profile';
  const [role, setRole] = useState('');
  const [user, setUser] = useState();
  const [loader, setLoader] = useState(true);
  const [updateLoader, setUpdateLoader] = useState(false);

  let history = useHistory();
  
  const nameRef = useRef('');
  const emailRef = useRef('');
  const specialitiesRef = useRef('');
  const languagesRef = useRef('');
  const descriptionRef = useRef('');
  const experienceRef = useRef('');

  useEffect(() => {
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
        setUser(response.data.foundUser);
        setRole(response.data.foundUser.role);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err.response.status);
        if (err.response.status === 404) {
          alert('User not found');
        } else {
          alert('Something went wrong');
        }
      });
  };

  const postData = async () => {
    // console.log("posting")
    let newData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      role,
    };

    if (role === 'astrologer') {
      const specialitiesArray = await specialitiesRef.current.value
        .split(',')
        .map((speciality) => {
          return speciality.trim();
        });

      const languagesArray = await languagesRef.current.value
        .split(',')
        .map((speciality) => {
          return speciality.trim();
        });

      newData = {
        ...newData,
        specialities: specialitiesArray,
        languages: languagesArray,
        description: descriptionRef.current.value,
        experience: experienceRef.current.value,
      };
    }
    console.log(newData);
    setUpdateLoader(true);
    await axios
      .post('http://localhost:5000/api/user/user/update', newData, {
        headers: { authorization: `Bearer ` + getToken() },
      })
      .then((response) => {
        // console.log(response);
        setUpdateLoader(false)
        alert('Updated Successfully');
      })
      .catch((err) => {
        console.log(err);
        setUpdateLoader(false)
        alert('Something went wrong');
      });
  };

  const handleCreateMeet = () => {
    history.push('/');
    sessionStorage.setItem('roomID', user._id);
  }

  return (
    <>
      <MainContainer>
        <Heading>Profile</Heading>
        {loader ? (
          <Inner>
            <h3>Loading...</h3>
          </Inner>
        ) : (
          <Inner>
            <UserProfile
              data={user}
              nameRef={nameRef}
              emailRef={emailRef}
              setRole={setRole}
              getToken={getToken}
            />
            {role === 'astrologer' ? (
              <AstroProfile
                data={user.astrologerInfo}
                specialitiesRef={specialitiesRef}
                languagesRef={languagesRef}
                descriptionRef={descriptionRef}
                experienceRef={experienceRef}
              />
            ) : (
              <></>
            )}
          </Inner>
        )}
        <CreateMeetButton onClick={handleCreateMeet}>Start Meet</CreateMeetButton>
        <SendButton onClick={postData}>{updateLoader ? "Updating Data": "Update Data"}</SendButton>
      </MainContainer>
    </>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  min-height: 100vh;
  width: 50vw;
  padding: 0 5vw;
  padding-bottom: 20px;

  @media (max-width: 1050px) {
    width: 80%;
    overflow-x: hidden;
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

const CreateMeetButton = styled.button`
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
  }`;

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
