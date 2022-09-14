const User = require('../../models/user');
const axios = require('axios');

const videoChat = (socket, io, socketList) => {
  socket.on('BE-join-room', ({ roomId, userName, userId }) => {
    // Socket Join RoomName
    socket.join(roomId);
    //change this to false
    if(userId === roomId)
      socketList[socket.id] = { userName, video: true, audio: true, isHost: true, enabled: true, handRaised: false };    
    else
      socketList[socket.id] = { userName, video: true, audio: true, isHost: false, enabled: false, handRaised: false };
    // Set User List
    io.sockets.in(roomId).clients((err, clients) => {
      try {
        const users = [];
        clients.forEach((client) => {
          // Add User List
          users.push({ userId: client, info: socketList[client] });
        });
        console.log({ socketList });
        socket.broadcast.to(roomId).emit('FE-user-join', users);
      } catch (e) {
        io.sockets.in(roomId).emit('FE-error-user-exist', { err: true });
      }
    });
  });

  socket.on('BE-call-user', ({ userToCall, from, signal }) => {
    io.to(userToCall).emit('FE-receive-call', {
      signal,
      from,
      info: socketList[socket.id],
    });
  });

  socket.on('BE-accept-call', ({ signal, to }) => {
    io.to(to).emit('FE-call-accepted', {
      signal,
      answerId: socket.id,
    });
  });

  socket.on('BE-leave-room', ({ roomId, leaver }) => {
    delete socketList[socket.id];
    socket.broadcast
      .to(roomId)
      .emit('FE-user-leave', { userId: socket.id, userName: leaver });
    io.sockets.sockets[socket.id].leave(roomId);
  });

  socket.on('BE-remove-user', ({ roomId, target }) => {
    try{
      if(target === 'all'){
        socket.broadcast.to(roomId).emit('FE-end-meet', {});
      }else{
        io.to(target).emit('FE-end-meet', {});
      }
    }catch(error){
      console.log(error);
    }
  });

  socket.on("BE-chat-toggler", ({ roomId, chatEnabled }) => {
    socket.broadcast.to(roomId).emit("FE-chat-toggler", { enableChat: chatEnabled });
  });
  socket.on("BE-toggle-enabled", ({ roomId, target, newState, targetName }) => {
    // socket.broadcast.to(roomId).emit("FE-toggle-enabled", { target, newState, targetName });
    io.to(target).emit("FE-toggle-enabled", { target, newState, targetName, roomId });
  });

  socket.on("BE-list-updator", ({roomId, newState, target, targetName}) => {
    socketList[socket.id].enabled = newState;
    socket.broadcast.to(roomId).emit("FE-list-updator", { target, newState, targetName });
  });

  socket.on('BE-media-close', ({ userId, targetType }) => {
    if( userId && (targetType === 'videoH' || targetType === 'audioH') ){
      io.to(userId).emit('FE-media-close', { targetType });
    }
  });

  socket.on('BE-toggle-camera-audio', ({ roomId, switchTarget }) => {
    console.log({ socketList });
    if (switchTarget === 'video' || switchTarget === 'both') {
      socketList[socket.id].video = !socketList[socket.id].video;
    } if (switchTarget === 'audio' || switchTarget === 'both') {
      socketList[socket.id].audio = !socketList[socket.id].audio;
    }
    socket.broadcast
      .to(roomId)
      .emit('FE-toggle-camera', { userId: socket.id, switchTarget });
  });

  socket.on('BE-toggle-both', ({ roomId }) => {
    socketList[socket.id].video = false;
    socketList[socket.id].audio = false;
    socketList[socket.id].handRaised = false;
    socket.broadcast
      .to(roomId)
      .emit('FE-toggle-camera', { userId: socket.id, switchTarget: 'both' });
  });

  socket.on("BE-toggle-RH", ({ roomId, newHandState, userName }) => {
    socketList[socket.id].handRaised = newHandState;
    socket.broadcast.to(roomId).emit("FE-toggle-RH", { newHandState, userName });
  });
};

module.exports = videoChat;
