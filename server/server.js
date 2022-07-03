// If we are not in production then use .env file
process.env.NODE_ENV !== "production" && require("dotenv").config();

const express = require("express");
const app = express();
const morgan = require("morgan");
const corsOptions = require("./utils/cors");
const connectDB = require("./utils/database");
const cors = require("cors");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const routes = require("./routes");
const socketRespond = require("./controllers/socket");
const PORT = process.env.PORT || 5000;

// Database connection
connectDB();

// Middleswares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use("/api", routes);

// Socket
let socketList = {};
io.on("connection", (socket) => socketRespond(socket, io, socketList));

// Genric routes handler
app.get("*", (req, res) => {
  return res.status(404).json({
    message: "Invalid URL",
  });
});

// Start Server
http.listen(PORT, () => console.log("Server running on " + PORT));
