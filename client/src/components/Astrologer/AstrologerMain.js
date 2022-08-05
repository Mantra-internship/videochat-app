import React from 'react';
import { useEffect, useState } from 'react';
import AstrologerCard from './AstrologerCard';
import axios from 'axios';
import styled from 'styled-components';

function AstrologerMain() {
  const [astrologersData, setAstrologersData] = useState([{}]);

  useEffect(() => {
    astrologersDataFetcher();
  }, []);

  const astrologersDataFetcher = async () => {
    await axios
      .get('http://localhost:5000/api/user/astrologers')
      .then((resObj) => {
        // console.log(resObj.data)
        setAstrologersData(resObj.data);
        console.log(astrologersData);
      })
      .catch((error) => {
        console.log(error);
        setAstrologersData([]);
      });
  };
  return (
    // loop through all the astrolgors and display them in details
    <>
      <Heading>Our Astrologers</Heading>
      <Container>
        {astrologersData.map((astrologer) => {
          return (
            <AstrologerCard
              key={astrologer.id}
              astrologer={astrologer}
            ></AstrologerCard>
          );
        })}
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 3;
  flex-direction: row;
  height: 100vh;
  flex-wrap: wrap;
  // flex-grow: 3;
  margin-top: 20px;

  @media (max-width: 768px) {
    padding: 20px;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
  }
`;

const Heading = styled.div`
  width: 100%;
  text-align: center;
  font-size: 7vw;
  margin: 20px 0;
`;

export default AstrologerMain;
