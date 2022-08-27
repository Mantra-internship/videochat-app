import React, {useState} from 'react';
import styled from 'styled-components';

function AstrologerCard({ astrologer }) {
  const [roomID, setRoomID] = useState('');
  const getRoomHost = () => {
    console.log(astrologer);
    sessionStorage.setItem('roomHost', JSON.stringify(astrologer));
  }
  return (
    <Card>
      <img
        style={{
          width: '150px',
          borderRadius: '20px',
          // margin: '0 31% 0 33%',
        }}
        src={astrologer.profilePic}
        alt="user"
      />
      <h2
        style={{
          padding: '5px 20px',
          margin: '5px 0 0 0',
          fontSize: '25px',
        }}
      >
        Name - {astrologer.name}
      </h2>
      <p
        style={{
          margin: '5px 0 20px 0',
          fontSize: '25px',
        }}
      >
        Phone - {astrologer.phone}
      </p>
      <p
        style={{
          margin: '5px 0 20px 0',
          fontSize: '25px',
        }}
      >
        E-Mail - {astrologer.email}
      </p>
      <ButtonContainer>
        <a
          style={{
            textDecoration: 'none',
            color: 'white',
            fontSize: '20px',
          }}
          href={`/astrologer/${astrologer.phone}`}
        >
          <Button>
              See Profile
          </Button>
        </a>
        <a
          style={{
            textDecoration: 'none',
            color: 'white',
            fontSize: '20px',
          }}
          href={`/`}
        >
        <Button
            onClick={getRoomHost}>
            Join room
          </Button>
        </a>
        </ButtonContainer>
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
  width: 400px;
  height: 400px;
  margin: 20px;

  :hover{
    border: 4px solid #fdcb6e;
  }
}
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
  height: 50px;
  padding: 20px 0; 
`;

const Button = styled.button`
  height: 50px;
  // margin-top: 35px;
  width: 200px;
  outline: none;
  border: none;
  border-radius: 15px;
  padding: 10px 20px;
  // color: #d8e9ef;
  color: white;
  background-color: #4ea1d3;
  font-size: 20px;
  font-weight: 500;
  margin-top: 20px;

  :hover {
    background-color: #7bb1d1;
    cursor: pointer;
  }

  > a {
    width: 100%;
    height: 100%;
    color: white;
  }
`;

export default AstrologerCard;
