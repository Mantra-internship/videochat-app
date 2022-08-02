import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

function AstrologersPage(props) {
  const [astrologerData, setAstrologerData] = useState([]);

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
        console.log(astrologerData);
      })
      .catch((error) => {
        console.log(error);
        setAstrologerData([]);
      });
  };

  return (
    <>
      <SectionLeft>
        <div style={{ flex: '1' }}>
          <div style={{ marginLeft: '50px' }}>
            <img
              style={{
                display: 'inline-block',
                width: '200px',
                height: '200px',
                borderRadius: '121px',
                border: '3px solid red',
              }}
              src={'https://freesvg.org/img/abstract-user-flat-4.png'}
            />
          </div>
        </div>
        <div style={{ flex: '2' }}>
          <h2 style={{ display: 'inline-block' }}>{astrologerData.name}</h2>
          {astrologerData.approved ? (
            <img
              style={{
                display: 'inline-block',
                width: '30px',
                height: '30px',
                borderRadius: '121px',
                border: '1px solid red',
                marginLeft: '10px',
              }}
              src="https://d1gcna0o0ldu5v.cloudfront.net/fit-in/20x20/assets/images/astrologer_profile/verified.webp"
            />
          ) : (
            <></>
          )}
          <br></br>
          <img
            src="https://d1gcna0o0ldu5v.cloudfront.net/fit-in/20x20/assets/images/astrologer_profile/chatoffline.png"
            style={{
              display: 'inline-block',
              width: '50px',
              height: '50px',
              borderRadius: '121px',
              border: '1px solid red',
              marginTop: '0',
            }}
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
              width: '50px',
              height: '50px',
              borderRadius: '121px',
              border: '1px solid red',
              display: 'inline-block',
              marginLeft: '35px',
              marginTop: '0',
            }}
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
            style={{
              display: 'inline-block',
              width: '50px',
              height: '50px',
              borderRadius: '121px',
              border: '1px solid red',
              display: 'inline-block',
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
          <br></br>
          <p style={{ fontSize: '20px', marginTop: '0' }}>
            <b>English</b>
          </p>
          <p style={{ fontSize: '20px', marginTop: '0' }}>
            <b>4</b> years
          </p>
          <p
            style={{
              fontSize: '20px',
              marginTop: '0',
              border: '1px solid #ccc',
              borderRadius: '10px',
              display: 'inline-block',
              padding: '5px',
            }}
          >
            Tarot
          </p>
          <br></br>
          <button
            style={{
              border: '2px solid red',
              borderRadius: '25px',
              backgroundColor: 'white',
              color: 'red',
            }}
          >
            <img
              src="https://d1gcna0o0ldu5v.cloudfront.net/fit-in/20x20/assets/images/astrolger/busy-status-chat.png"
              style={{
                display: 'inline-block',
                width: '50px',
                height: '50px',
                borderRadius: '121px',
                border: '1px solid red',
                display: 'inline-block',
                marginLeft: '35px',
                marginTop: '0',
              }}
            />
            <p
              style={{
                display: 'inline-block',
                fontSize: '20px',
                margin: '0 30px',
              }}
            >
              Start chat
            </p>
            <p style={{ display: 'inline-block', fontSize: '20px' }}>
              <b>$25</b> per min
            </p>
          </button>
          <button
            style={{
              border: '2px solid red',
              borderRadius: '25px',
              backgroundColor: 'white',
              color: 'red',
              marginLeft: '20px',
            }}
          >
            <img
              src="https://d1gcna0o0ldu5v.cloudfront.net/fit-in/20x20/assets/images/astrolger/busy-status-call.png"
              style={{
                display: 'inline-block',
                width: '50px',
                height: '50px',
                borderRadius: '121px',
                border: '1px solid red',
              }}
            />
            <p
              style={{
                display: 'inline-block',
                fontSize: '20px',
                margin: '0 30px',
              }}
            >
              Start call
            </p>
            <p style={{ display: 'inline-block', fontSize: '20px' }}>
              <b>$25</b> per min
            </p>
          </button>
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
    </>
  );
}

const SectionLeft = styled.div`
  display: flex;
  width: 80%;
  margin: 20px 115px;
  border: 2px solid #ccc;
  border-radius: 20px;
  padding: 20px;
`;

const SectionRight = styled.div`
  display: flex;
  width: 80%;
  margin: 20px 115px;
  border: 2px solid #ccc;
  padding: 20px;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
`;

const IMG = styled.div`
  display: inline-block;
  width: 200px;
  height: 200px;
  border-radius: 121px;
  border: 3px solid red;
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