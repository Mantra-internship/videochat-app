import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import socket from '../../socket';

const UserList = ({ display, roomId, isHost, userList }) => {

  // const currentUser = sessionStorage.getItem('user');

  const closeVideo = (user) => {   // can only switch off
    const { userId, video } = user;
    if(userId != 'localUser' && isHost && video){
      console.log(`toggle video - ${userId}`)
      socket.emit('BE-media-close', { userId, targetType: 'videoH' });
    }
  }
  const closeAudio = (user) => {   // can only switch off
    const { userId, audio } = user;
    if(userId != 'localUser' && isHost && audio){
      console.log(`toggle audio - ${userId}`)
      socket.emit('BE-media-close', { userId, targetType: 'audioH' });
    }
  }
  const removeUser = (userId) => {
    if(userId != 'localUser' && isHost){
      console.log(`remove user - ${userId}`)
      socket.emit('BE-remove-user', { roomId, target: userId });
    }
  }

  const toggleEnable = (user) => {
    const {userId} = user[1];
    console.log(`${userId} - enabled = ${user[1].enabled}`);
    if(userId != 'localUser' && isHost){
      console.log(`toggle enable - ${userId}`)
      socket.emit('BE-toggle-enabled', { roomId, target: userId, newState: !(user[1].enabled), targetName: user[0] });
    }
  }

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
                <User style={{backgroundColor: (( user[1] && user[1].handRaised ) ? 'rgb(152,251,152)': 'white') }}> 
                  { user[0] === "localUser" ? (isHost ? "You (Host)" : "You") : (user[1].isHost ? `${user[0]} (Host)` : user[0]) }
                  <div>
                    <VideoIcon className={user[1] && user[1].video ? 'fas fa-video' : 'fas fa-video-slash'} style={{ color:  user[1] && user[1].video ? 'green' : 'grey'}} onClick={() => { closeVideo(user[1]) }}/>
                    <MicIcon className={ user[1] && user[1].audio ? 'fas fa-microphone' : 'fas fa-microphone-slash'} style={{ color:  user[1] && user[1].audio ? 'green' : 'grey'}} onClick={() => {closeAudio(user[1]) }}/>
                    { isHost && user[1].userId != 'localUser' ? <RemoveIcon className={'fas fa-minus-circle'} onClick={() => { removeUser(user[1].userId) }}/> : <></>}
                    { isHost && user[0] != 'localUser' ? <ToggleIcon className={ user[1] && user[1].enabled ? 'fa fa-toggle-on' : 'fa fa-toggle-off' } style={{ color:  user[1] && user[1].enabled ? 'green' : 'red'}} onClick={() => { toggleEnable(user) }}/> : <></>}
                  </div>
                  {/* <div>{user[1].userId}</div> */}
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

const ToggleIcon = styled.i`
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
