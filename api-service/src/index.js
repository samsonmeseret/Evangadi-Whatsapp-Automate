const express = require("express");
const { client } = require("./config/watConfig");
const { createProxyMiddleware } = require("http-proxy-middleware");
const qrcode = require("qrcode-terminal");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", // Replace with your React app's origin
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: true, // Replace with your React app's origin
  })
);
app.use(
  "/socket.io",
  createProxyMiddleware({ target: "http://localhost:4040", ws: true })
);

app.get("/connect", (req, res) => {
  client.on("qr", (qr) => {
    // qrcode.generate(qr, { small: true }, function (qrcode) {
    // console.log(qrcode);
    console.log(qr);
    io.emit("cuptureQR", qr);
    res.send(qr);
    // });
  });

  client.on("ready", () => {
    console.log("Client is ready!");
    client.getChats().then((chats) => {
      console.log(chats);
    });

    // Notify connected clients that the WhatsApp client is ready
    io.emit("whatsappClientReady");
  });

  client.initialize();
});

server.listen(4040, () => {
  require("./config/watConfig");
  console.log("Server Started on 4040");
});
