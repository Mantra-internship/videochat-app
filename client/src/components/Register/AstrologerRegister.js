import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function AstrologerRegister() {
  const [speciality, setSpeciality] = useState();
  const [description, setDescription] = useState();
  const [experience, setExperience] = useState();

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
        <Button>Save Data</Button>
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
