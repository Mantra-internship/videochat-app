import React from 'react';
import styled from 'styled-components';

function AstrologerCard({ astrologer }) {
  return (
    <Card>
      <img
        style={{
          width: '100px',
          borderRadius: '20px',
          margin: '0 31% 0 33%',
        }}
        src={astrologer.profilePic}
        alt="user"
      />
      <h3
        style={{
          padding: '5px 20px',
          margin: '5px 0 0 0',
        }}
      >
        Name - {astrologer.name}
      </h3>
      <p
        style={{
          margin: '5px 0 20px 0',
        }}
      >
        Phone - {astrologer.phone}
      </p>
      <p
        style={{
          margin: '5px 0 20px 0',
        }}
      >
        E-Mail - {astrologer.email}
      </p>
      <Button
      >
        <a
          style={{
            textDecoration: 'none',
            color: 'white',
            fontSize: '20px',
          }}
          href={`/astrologer/${astrologer.phone}`}
        >
          See Profile
        </a>
      </Button>
    </Card>
  );
}

const Container = styled.div`
  flex: 2;
  margin-top: 20px;

  @media (max-width: 768px) {
    padding: 20px;
    width: 100%;
    margin: 3% 0 8% 8%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Card = styled.div`
  display: inline-block;
  border: 4px solid #ccc;
  border-radius: 15%;
  padding: 15px;
  width: 300px;
  height: 350px;
  margin: 20px;

  :hover{
    border: 4px solid #fdcb6e;
  }
}
`;

const Button = styled.button`
  height: 50px;
  // margin-top: 35px;
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

export default AstrologerCard;
