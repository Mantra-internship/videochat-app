import io from "socket.io-client";

const sockets = io("https://video-chat-backend99.herokuapp.com/");

export default sockets;
