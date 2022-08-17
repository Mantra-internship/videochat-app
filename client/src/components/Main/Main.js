import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import socket from '../../socket';
import axios from 'axios';

const Main = (props) => {
  document.title = 'Home - VideoChat App';
  const roomRef = useRef();
  // const userRef = useRef();
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    socket.on('FE-error-user-exist', ({ errorCode, userName, roomId, userID, tokenObj }) => {
      if (errorCode == 200) {
        sessionStorage.setItem('user', userName);
        sessionStorage.setItem('UID', userID);
        sessionStorage.setItem("userI", JSON.stringify(tokenObj));
        props.history.push(`/room/${roomId}`);
      } else if(errorCode == 401) {
        setErr(true);
        setErrMsg("The Meet hasn't been started yet");
      } else {
        setErr(true);
        setErrMsg('User is already in the room');
      }
    });
  }, [props.history]);

  const getToken = () => {
    const cArray = document.cookie.split(' ');
    let jwtToken ='';
    cArray.map((string) => {
      let sArray = string.split('=');
      if (sArray[0] === 'user') {
        jwtToken = sArray[1];
        if (jwtToken[jwtToken.length - 1] === ';') {
          jwtToken = jwtToken.slice(0, -1);
        }
      }
    });
    return jwtToken;
  };

  const clickJoin = async () => {
    setLoader(true);
    const roomName = roomRef.current.value;
    let userName = "";
    let userID = "";
    let tokenObj = "";
    let userRole = "";

    await axios.post("http://localhost:5000/api/user/get-token", {},{
      headers: { authorization: `Bearer ` + getToken() },
    })
    .then((response) => {
      // console.log(response.data.tokenObj);
      userName = response.data.tokenObj.name;
      userID = response.data.tokenObj.id;
      tokenObj = response.data.tokenObj;
      userRole = response.data.tokenObj.role;
      // sessionStorage.setItem("userI", response.data.tokenObj);
      setLoader(false);

      if (!roomName || !userName || !userID) {
        setErr(true);
        setErrMsg('Enter Room Name or User Name');
      } else {
        socket.emit('BE-check-user', { roomId: roomName, userName, userID, tokenObj, userRole });
      }
    })
    .catch((err) => {
      console.log(err);
      setLoader(false);
      alert('Something went wrong');
    });

    
  }

  return (
    <MainContainer>
      <Row>
        <Label htmlFor="roomName">Room Name</Label>
        <Input type="text" id="roomName" ref={roomRef} />
      </Row>
      <JoinButton onClick={clickJoin}> Join </JoinButton>
      {err ? <Error>{errMsg}</Error> : null}
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 15px;
  line-height: 35px;
`;

const Label = styled.label``;

const Input = styled.input`
  width: 150px;
  height: 35px;
  margin-left: 15px;
  padding-left: 10px;
  outline: none;
  border: none;
  border-radius: 5px;
`;

const Error = styled.div`
  margin-top: 10px;
  font-size: 20px;
  color: #e85a71;
`;

const JoinButton = styled.button`
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

  a {
    text-decoration: none;
    color: #d8e9ef;
  }
`;

export default Main;
