import React, { useRef, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'
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

  const roomHost = JSON.parse(sessionStorage.getItem("roomHost"))

  let roomID = ''
  
  if (roomHost != null) {
    roomID = roomHost._id
    const user = JSON.parse(sessionStorage.getItem('currentuser'));
  }
  const history = useHistory();

  useEffect(() => {
    if (roomID) roomRef.current = roomID
    else roomRef.current = '';
    
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

  // join meet functionality
  const clickJoin = async () => {
    setLoader(true);
    const roomName = roomRef.current;
    let userName = "";
    let userID = "";
    let tokenObj = "";
    let userRole = "";

    await axios.post("http://localhost:5000/api/user/get-token", {
      roomId: roomName
    },{
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
        setErrMsg('Enter Valid Room Address');
      } else {
        socket.emit('BE-check-user', { roomId: roomName, userName, userID, tokenObj, userRole });
      }
    })
    .catch((err) => {
      console.log(err);
      setLoader(false);
      alert('Please login to join the meet');
      history.push('/login')
    });
  }

  const handleRoomReset = () => {
    sessionStorage.removeItem('roomHost');
    roomID = '';
    sessionStorage.removeItem('roomID')
    window.location.reload()
  }

  return (
    <MainContainer>
      <Row>
        {(roomID != '') ? (
          <Heading>{`You are about to join room of ${roomHost.name}`}</Heading>
        ) : (
            <Heading>Select a room to join <Link to="/astrologers">here</Link></Heading>
        )}
      </Row>    
      {roomID != '' && <ResetButton onClick={handleRoomReset}>Reset Room</ResetButton>}
      {roomID != '' && <JoinButton onClick={clickJoin}> Click to Join </JoinButton>}
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

const Heading = styled.h5`
  font-size: 25px;

  > a {
    text-decoration: none;
    color: gold;
  }
`;

const Error = styled.div`
  margin-top: 10px;
  font-size: 20px;
  color: #e85a71;
`;

const JoinButton = styled.button`
  height: 40px;
  margin-top: 20px;
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

const ResetButton = styled.button`
  height: 40px;
  margin-top: 20px;
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
