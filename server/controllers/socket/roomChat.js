const roomChat = (socket, io, socketList) => {
  socket.on("BE-send-message", ({ roomId, msg, sender, reciever, hostId }) => {
    if(reciever === 'all'){
      io.sockets.in(roomId).emit("FE-receive-message", { msg, sender });
    }else{
      // To be tested
      io.to(hostId).emit("FE-recieve-message", { msg, sender });
    }
  });
};

module.exports = roomChat;
