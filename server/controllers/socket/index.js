const videoChat = require("./videoChat");
const roomChat = require("./roomChat");

const socketFunc = (socket, io, socketList) => {
  console.log(`New User connected: ${socket.id}`);
  // console.log(socket);
  socket.on("disconnect", () => {
    socket.disconnect();
    console.log("User disconnected!");
  });

  socket.on("BE-check-user", ({ roomId, userName, userID, tokenObj }) => {
    let error = false;

    io.sockets.in(roomId).clients((err, clients) => {
      clients.forEach((client) => {
        if (socketList[client] == userName) {
          error = true;
        }
      });
      socket.emit("FE-error-user-exist", { error, userName, roomId, userID, tokenObj });
    });
  });

  videoChat(socket, io, socketList);
  ~roomChat(socket, io, socketList);
};

module.exports = socketFunc;
