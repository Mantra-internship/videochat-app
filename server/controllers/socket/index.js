const videoChat = require("./videoChat");
const roomChat = require("./roomChat");

const socketFunc = (socket, io, socketList) => {
  console.log(`New User connected: ${socket.id}`);
  // console.log(socket);
  socket.on("disconnect", () => {
    socket.disconnect();
    console.log("User disconnected!");
  });

  socket.on("BE-check-user", ({ roomId, userName, userID, tokenObj, userRole }) => {
    let errorCode = 200;
    if( (roomId === userID && userRole === "astrologer") || (io.sockets.adapter.rooms[roomId] && io.sockets.adapter.rooms[roomId].length > 0)){
      // Let the user enter user but first check first name duplication
      io.sockets.in(roomId).clients((err, clients) => {
        clients.forEach((client) => {
          if (socketList[client] == userName) {
            errorCode = 409;
          }
        });
        socket.emit("FE-error-user-exist", { errorCode, userName, roomId, userID, tokenObj });
      });
    }
    else{
      // Don't let the user enter
      errorCode = 401;
      socket.emit("FE-error-user-exist", { errorCode, userName, roomId, userID, tokenObj });
    }
  });

  videoChat(socket, io, socketList);
  ~roomChat(socket, io, socketList);
};

module.exports = socketFunc;
