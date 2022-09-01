import React from 'react';
import styled from 'styled-components';

function AstroProfile({
  data,
  specialitiesRef,
  languagesRef,
  descriptionRef,
  experienceRef
}) {
  return (
    <>
      <Row>
        <Label htmlFor="Speciality">Speciality</Label>
        <Textarea
          type="text"
          id="Speciality"
          required
          placeholder="Kundli..."
          defaultValue={ data ? data.specialities : ""}
          ref={specialitiesRef}
        />
      </Row>
      <Row>
        <Label htmlFor="Languages">Languages</Label>
        <Textarea
          type="text"
          id="Languages"
          required
          placeholder="Hindi, English..."
          defaultValue={data ? data.languages : ""}
          ref={languagesRef}
        />
      </Row>
      <Row>
        <Label htmlFor="description">Description</Label>
        <Textarea
          type="text"
          id="description"
          required
          placeholder="I am a"
          defaultValue={data ? data.description : ""}
          ref={descriptionRef}
        />
      </Row>
      <Row>
        <Label htmlFor="experience">Experience</Label>
        <Input
          type="number"
          id="experience"
          placeholder="Years"
          defaultValue={data ? data.experience : 0}
          ref={experienceRef}
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
