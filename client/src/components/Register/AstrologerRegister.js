import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

function AstrologerRegister(props) {
  const [speciality, setSpeciality] = useState();
  const [languages, setLanguages] = useState();
  const [description, setDescription] = useState();
  const [experience, setExperience] = useState()
  const [Loader, setLoader] = useState(false);

  document.title = 'Astrologer Register';

  // axios request to sava a new astrologer or user depending on the role.
  let data = {
    speciality,
    languages,
    description,
    experience,
  };

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

  const saveAstrologerData = async () => {
    setLoader(true);
    await axios
      .post(
        'https://video-chat-backend99.herokuapp.com/api/user/add-astrologer-info',
        data,
        {
          // send the JWT token
          headers: { authorization: `Bearer ` + getToken() },
        }
      )
      .then((response) => {
        // console.log(response.data);
        props.history.push('/profile');
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
        alert('Something went wrong');
      });
  };

  return (
    <>
      <MainContainer>
        <Heading>Astrologer Data</Heading>
        <Inner>
          <Row>
            <Label htmlFor="Speciality">Speciality</Label>
            <Textarea
              type="text"
              id="Speciality"
              required
              placeholder="Kundli..."
              onChange={(event) => setSpeciality(event.target.value)}
            />
          </Row>
          <Row>
            <Label htmlFor="Languages">Languages</Label>
            <Textarea
              type="text"
              id="Languages"
              required
              placeholder="Hindi, English..."
              onChange={(event) => setLanguages(event.target.value)}
            />
          </Row>
          <Row>
            <Label htmlFor="description">Description</Label>
            <Textarea
              type="text"
              id="description"
              required
              placeholder="I am a"
              onChange={(event) => setDescription(event.target.value)}
            />
          </Row>
          <Row>
            <Label htmlFor="experience">Experience</Label>
            <Input
              type="number"
              id="experience"
              placeholder="Years"
              onChange={(event) => setExperience(event.target.value)}
            />
          </Row>
        </Inner>
        <Button onClick={saveAstrologerData}>{Loader ? "Saving Data": "Save Data"}</Button>
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
  font-size: 5vw;
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
  width: 300px;
  height: 35px;
  margin-left: 15px;
  padding-left: 10px;
  outline: none;
  border: none;
  border-radius: 5px;
`;

const Textarea = styled.textarea`
  height: 70px;
  width: 300px;
  resize: none;
  font-size: 20px;
  outline: none;
  margin-left: 15px;
  padding-left: 10px;
  border: none;
  border-radius: 5px;
`;

const Button = styled.button`
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

export default AstrologerRegister;
