const roomChat = (socket, io, socketList) => {
  socket.on("BE-send-message", ({ roomId, msg, sender }) => {
    io.sockets.in(roomId).emit("FE-receive-message", { msg, sender });
  });
};

module.exports = roomChat;
