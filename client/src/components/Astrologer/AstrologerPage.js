import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

function AstrologersPage(props) {
  const [astrologerData, setAstrologerData] = useState([]);

  document.title = 'Astrologer - ' + props.match.params.uphone;

  // make a call for a particular astrolger with a unique phone number.
  useEffect(() => {
    // console.log(props.match.params.uphone);
    astrologersDataFetcher();
  }, []);

  const astrologersDataFetcher = async () => {
    await axios
      .get(
        'http://localhost:5000/api/user/astrologer/' +
          props.match.params.uphone,
        {}
      )
      .then((resObj) => {
        console.log(resObj.data);
        setAstrologerData(resObj.data);
        // console.log(astrologerData);
      })
      .catch((error) => {
        console.log(error);
        setAstrologerData([]);
      });
  };

  return (
    <Container>
      <SectionLeft>
        <div>
          <div style={{ }}>
            <img
              style={{
                display: 'inline-block',
                width: '150px',
                height: '150px',
                borderRadius: '121px',
                border: '3px solid green',
              }}
              alt="user"
              src={astrologerData.profilePic}
            />
          </div>
          <Button>Join Room</Button>
        </div>
        <div style={{ }}>
          <h2 style={{ display: 'inline-block' }}>{astrologerData.name}</h2>
          {astrologerData.approved ? (
            <img
              style={{
                display: 'inline-block',
                width: '30px',
                height: '30px',
                borderRadius: '121px',
                border: '1px solid green',
                marginLeft: '10px',
              }}
              src="https://d1gcna0o0ldu5v.cloudfront.net/fit-in/20x20/assets/images/astrologer_profile/verified.webp"
              alt="verified"
            />
          ) : (
            <></>
          )}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              // marginTop: '15px',
            }}
          >
            <img
              src="https://d1gcna0o0ldu5v.cloudfront.net/fit-in/20x20/assets/images/astrologer_profile/chatoffline.png"
              style={{
                display: 'inline-block',
                width: '30px',
                height: '30px',
                marginTop: '0',
              }}
              alt="chatoffline"
            />
            <p
              style={{
                display: 'inline-block',
                marginTop: '0',
                marginLeft: '10px',
                fontSize: '20px',
              }}
            >
              <b>14k</b> mins
            </p>
            <img
              src="https://d1gcna0o0ldu5v.cloudfront.net/fit-in/20x20/assets/images/astrologer_profile/calloffline.png"
              style={{
                display: 'inline-block',
                width: '30px',
                height: '30px',
                marginLeft: '35px',
                marginTop: '0',
              }}
              alt="calloffline"
            />
            <p
              style={{
                display: 'inline-block',
                marginLeft: '10px',
                fontSize: '20px',
                marginTop: 0,
              }}
            >
              <b>14k</b> mins
            </p>
            <img
              src="https://d1gcna0o0ldu5v.cloudfront.net/fit-in/20x20/assets/images/astrologer_profile/reports.webp
    "
              alt="reports"
              style={{
                display: 'inline-block',
                width: '30px',
                height: '30px',
                marginLeft: '35px',
                marginTop: '0',
              }}
            />
            <p
              style={{
                display: 'inline-block',
                marginLeft: '10px',
                fontSize: '20px',
                marginTop: '0',
              }}
            >
              <b>14k</b> mins
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'space-around',
              marginTop: '15px',
            }}
          >
            <p style={{ fontSize: '20px', marginTop: '0', marginRight: '10px' }}>
              <b>Languages - </b> English
            </p>
            <p style={{ fontSize: '20px', marginTop: '0', marginRight: '10px' }}>
              <b>Experience - </b> 4 years
            </p>
            <p
              style={{
                fontSize: '20px',
                marginTop: '0',
              }}
            >
              <b>Speciality</b> - Kundli
            </p>
          </div>
        </div>
      </SectionLeft>
      <SectionRight>
        <h2>About Me</h2>
        <p>
          ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
          ea commodo consequat. Duis aute irure dolor in reprehenderit in
          voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia
          deserunt mollit anim id est laborum.
        </p>
      </SectionRight>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: space-around;
  flex-direction: column;
`;

const SectionLeft = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 90px;
  border: 2px solid #ccc;
  border-radius: 20px;
  padding: 20px;
  color: #000;
  background: white;
  flex-wrap: wrap;

   @media(max-width: 900px){
    margin: 30px 30px;
  }
`;

const SectionRight = styled.div`
  display: flex;
   margin: 30px 90px;
   margin-bottom: 0px;
  border: 2px solid #ccc;
  padding: 20px;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  color: #000;
  background: white;

  @media(max-width: 900px){
    margin: 30px 30px;
  }
`;

const IMG = styled.div`
  display: inline-block;
  width: 200px;
  height: 200px;
  border-radius: 121px;
  border: 3px solid red;
`;

const Button = styled.button`
  height: 50px;
  margin-top: 15px;
  outline: none;
  border: none;
  border-radius: 15px;
  padding: 10px 20px;
  color: #d8e9ef;
  background-color: #4ea1d3;
  font-size: 20px;
  font-weight: 500;

  :hover {
    background-color: #7bb1d1;
    cursor: pointer;
  }
`;

// const outerDiv = styled.div`
//     width: 80%;
//     border: 2px solid #ccc;
//     border-radius: 5px;
//     margin: 20px 130px 20px 130px;
//     padding-top: 20px;
// `;

// const Left = styled.div`
//     float: left;
// 	display: inline-block;
// 	width: 275px;
// 	height: 215px;
//     margin-left: 20px;
//     `;

// const Pic = styled.div`
// 	width:200px;
// 	height: 200px;
//     border-radius: 100px;
//     border: 3px solid red;
//      `;

// const Right = styled.div`
// 	float: left;
// `;

// const Clear = styled.div`
// 	clear: both;
// `;

// const Button = styled.div`
// 	padding: 15px;
// 	border-radius: 15px;
// 	background-color: white;
// 	color: lightgreen;
// 	font-size: 20px;
// 	border: 2px solid lightgreen;
// `;

export default AstrologersPage;
