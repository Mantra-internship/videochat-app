import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

function AstroProfile(props) {
  return (
    <>
      <Row>
        <Label htmlFor="Speciality">Speciality</Label>
        <Textarea
          type="text"
          id="Speciality"
          required
          placeholder="Kundli..."
          value={props.speciality} // to be changed to dynamic content
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
          value={props.languages} // to be changed to dynamic content
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
          value={props.description} // to be changed to dynamic content
          onChange={(event) => setDescription(event.target.value)}
        />
      </Row>
      <Row>
        <Label htmlFor="experience">Experience</Label>
        <Input
          type="number"
          id="experience"
          placeholder="Years"
          value={props.experience} // to be changed to dynamic content
          onChange={(event) => setExperience(event.target.value)}
        />
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

export default AstroProfile;
