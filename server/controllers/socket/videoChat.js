const User = require('../../models/user');
const axios = require('axios');

const videoChat = (socket, io, socketList) => {
  socket.on('BE-join-room', ({ roomId, userName }) => {
    // Socket Join RoomName
    socket.join(roomId);
    //change this to false
    socketList[socket.id] = { userName, video: false, audio: false };

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
        io.to(socket.id).emit('FE-user-join', users);
        // io.sockets.in(roomId).emit('FE-user-join', users);
      } catch (e) {
        io.sockets.in(roomId).emit('FE-error-user-exist', { err: true });
      }
    });
  });

  // socket.on("BE-token-create", ({ userID }) => {
  //   if(!userID){
  //     socket.emit("FE-token-saver", {code: 400}, {});
  //   }else{
  //     User.findOne({ _id: userID }, (error, foundUser) => {
  //       if(error){
  //         console.log(error);
  //         socket.emit("FE-token-saver", {code: 400}, {});
  //       }else if(foundUser){
  //         console.log(foundUser);
  //         const tokenObj = {
  //           name: foundUser.name,
  //           phone_no: foundUser.phone,
  //           credits: foundUser.credits,
  //           eTime: (new Date().getTime() / 1000) + (foundUser.credits * 60) + 5
  //         }
  //         socket.emit("FE-token-saver", {}, tokenObj);
  //       }else{
  //         // console.log(userPhone);
  //         socket.emit("FE-token-saver", {code: 404}, {});
  //       }
  //     });
  //   }
  // });

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

  socket.on('BE-remove-user', ({ roomId, target, }) => {
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
  })

  // console.log(leaver)
  // console.log("Etime : ", eTime);
  // console.log("leavetime : ", leaveTime);
  //   if(leaveTime){
  //   console.log("inside if");
  //   const leavingUser =  User.findOne({ name : leaver});
  //   console.log("leavingUser : " + leavingUser);
  //   // ! error handling yet to be implemented
  //   if(leavingUser){
  //     let credits = leavingUser.credits;
  //     if((eTime - leaveTime <= 0))
  //       credits = 0;
  //     else{
  //       credits = Math.ceil((eTime - leaveTime)/60);
  //     }
  //     if(credits != leavingUser.credits){
  //       leavingUser.credits = credits;
  //       leavingUser.save();
  //     }
  //   }
  // }

  socket.on('BE-toggle-camera-audio', ({ roomId, switchTarget }) => {
    console.log({ socketList });
    if (switchTarget === 'video') {
      socketList[socket.id].video = !socketList[socket.id].video;
    } else {
      socketList[socket.id].audio = !socketList[socket.id].audio;
    }
    socket.broadcast
      .to(roomId)
      .emit('FE-toggle-camera', { userId: socket.id, switchTarget });
  });

  socket.on('BE-toggle-both', ({ roomId }) => {
    socketList[socket.id].video = false;
    socketList[socket.id].audio = false;
    socket.broadcast
      .to(roomId)
      .emit('FE-toggle-camera', { userId: socket.id, switchTarget: 'bothOff' });
  });
};

module.exports = videoChat;
