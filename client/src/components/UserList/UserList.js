import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import socket from '../../socket';

const UserList = ({ display, roomId, isHost, userList }) => {
  const currentUser = sessionStorage.getItem('user');

  const toggleVideo = (userId) => {
    if(userId != 'localUser'){
      console.log(`toggle video - ${userId}`)
    }
  }
  const toggleAudio = (userId) => {
    if(userId != 'localUser'){
      console.log(`toggle audio - ${userId}`)
    }
  }
  const removeUser = (userId) => {
    if(userId != 'localUser'){
      console.log(`remove user - ${userId}`)
      socket.emit('BE-remove-user', { roomId, target: userId });
    }
  }

  useEffect(() => {
    // console.log(userList);
    // socket.on('FE-receive-message', ({ msg, sender }) => {
    //   setMsg((msgs) => [...msgs, { sender, msg }]);
    // });
  }, []);

  const printer = (e) => {
    // console.log(Object.entries(userList));
    console.log(userList);
  }

  return (
    <UserContainer className={display === 2 ? '' : 'width0'}>
      <TopHeader>Participants</TopHeader>
      <ListArea>
        {
          Object.entries(userList).length > 0
            ?
              Object.entries(userList).map((user) => (
                <User> 
                  {user[0] === "localUser" ? "You" : user[0]}
                  <div>
                    <VideoIcon className={user[1] && user[1].video ? 'fas fa-video' : 'fas fa-video-slash'} style={{ color:  user[1] && user[1].video ? 'green' : 'red'}} onClick={() => { toggleVideo(user[1].userId) }}/>
                    <MicIcon className={ user[1] && user[1].audio ? 'fas fa-microphone' : 'fas fa-microphone-slash'} style={{ color:  user[1] && user[1].audio ? 'green' : 'red'}} onClick={() => { toggleAudio(user[1].userId) }}/>
                    <RemoveIcon className={'fas fa-minus-circle'} onClick={() => { removeUser(user[1].userId) }}/>
                  </div>
                  <div>{user[1].userId}</div>
                </User>
              ))
            :
              <></>
        }
      </ListArea>


      <DisableButton onClick={printer}>
        tester
      </DisableButton>

    </UserContainer>
  );
};

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  hieght: 100%;
  background-color: white;
  transition: all 0.5s ease;
  overflow: hidden;
  color: black;
`;

const TopHeader = styled.div`
  width: 100%;
  margin-top: 15px;
  font-weight: 600;
  font-size: 20px;
  color: black;
`;

const ListArea = styled.div`
  width: 100%;
  height: 83%;
  max-height: 83%;
  overflow-x: hidden;
  overflow-y: auto;
  color: black;
  padding-top: 20px;
`;

const User = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const VideoIcon = styled.i`
  height: 30px;
  aspect-ratio: 1;
  color: black;
`;

const MicIcon = styled.i`
  margin-left: 5px;
  height: 30px;
  aspect-ratio: 1;
  color: black;
`;

const RemoveIcon = styled.i`
  margin-left: 5px;
  height: 30px;
  aspect-ratio: 1;
  color: red;
`;

const DisableButton = styled.button`
  bottom: 0;
  width: 100%;
  height: 6%;
  padding: 15px;
  background-color: #4ea1d3;
  color: white;
  box-sizing: border-box;
  outline: none;
  cursor: pointer;

  :focus {
    outline: none;
  }
`;

export default UserList;
