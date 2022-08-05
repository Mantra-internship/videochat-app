import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
// import 'react-phone-input-2/lib/style.css';
// import PhoneInput from 'react-phone-input-2';

function Profile(props) {
  const [name, setName] = useState();
  const [email, setEmail] = useState('NULL');
  const [phone, setPhone] = useState();
  const [role, setRole] = useState();
  const [speciality, setSpeciality] = useState();
  const [languages, setLanguages] = useState();
  const [description, setDescription] = useState();
  const [experience, setExperience] = useState();

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const options = [
    { label: 'Astrologer', value: 'astrologer' },
    { label: 'User', value: 'user' },
  ];

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
          data
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
          <Row>
            <Label htmlFor="Name">Full Name</Label>
            <Input
              type="text"
              id="Name"
              required
              placeholder="John Doe"
              value={name} // to be changed to dynamic content
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
              value={email} // to be changed to dynamic content
              onChange={(event) => setEmail(event.target.value)}
            />
          </Row>
          <Row>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              type="phone"
              id="phone"
              placeholder="+91XXXXXXXXXX"
              value={phone} // to be changed to dynamic content
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
              value={role} // to be changed to dynamic content
              onChange={handleChange}
            >
              <option value="" selected disabled hidden>
                Are you a Astrologer or User?
              </option>
              {options.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </Select>
          </Row>
          <Row>
            <Label htmlFor="Speciality">Speciality</Label>
            <Textarea
              type="text"
              id="Speciality"
              required
              placeholder="Kundli..."
              value={speciality} // to be changed to dynamic content
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
              value={languages} // to be changed to dynamic content
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
              value={description} // to be changed to dynamic content
              onChange={(event) => setDescription(event.target.value)}
            />
          </Row>
          <Row>
            <Label htmlFor="experience">Experience</Label>
            <Input
              type="number"
              id="experience"
              placeholder="Years"
              value={experience} // to be changed to dynamic content
              onChange={(event) => setExperience(event.target.value)}
            />
          </Row>
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
