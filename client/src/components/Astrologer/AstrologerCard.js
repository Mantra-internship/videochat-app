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
        src="https://freesvg.org/img/abstract-user-flat-4.png"
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
      <button
        style={{
          padding: '10px 20px',
          margin: '5px 0',
        }}
      >
        <a
          style={{
            textDecoration: 'none',
            color: '#000',
            fontSize: '20px',
          }}
          href={`/astrologer/${astrologer.phone}`}
        >
          Connect
        </a>
      </button>
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
  height: 300px;
  margin: 20px;

  :hover{
    border: 4px solid #fdcb6e;
  }
}
`;

export default AstrologerCard;
