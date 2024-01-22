const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const { connectClient, allSessions } = require("./test");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const { listGroup } = require("./src/services/group/listGroups");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: true,
  })
);
app.use(
  "/socket.io",
  createProxyMiddleware({ target: "http://localhost:4040", ws: true })
);

// connecting whatsapp client
io.on("connect", (socket) => {
  console.log("Client connected ==> 🟢");

  // create connection to whatsapp
  socket.on("createConnection", (data) => {
    console.log(data);
    console.log("received emit");
    const { id } = data;

    // general websocket controller
    connectClient(id, socket);
  });

  // list groups
});

app.use((err, req, res, next) => {
  res.status(500).json({
    message: err?.message || "Something went wrong",
  });
});

server.listen(4040, () => {
  console.log("Server Started on 4040");
});
