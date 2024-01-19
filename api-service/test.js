const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const { listGroup } = require("./src/services/group/listGroups");

let allSessions = {};
const connectClient = (clientId, io) => {
  const client = new Client({
    puppeteer: {
      headless: false,
    },
    authStrategy: new LocalAuth({
      clientId: clientId,
    }),
  });

  //   if the client is not authenticated generate qr code
  client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true }, function (qrcode) {
      console.log(qrcode);
    });
    console.log(qr);
    io.emit("cuptureQR", qr);
  });

  // check if the Authentication is successful
  client.on("authenticated", () => {
    console.log("Authenticated !");
    io.emit("success", { msg: "authentication successful" });
  });

  // check if the client is ready
  client.on("ready", () => {
    console.log("Client is ready !");
    io.emit("ready", "Client is ready !");
    allSessions[clientId] = client;
  });

  // list groups
  listGroup(client, io);
  //   initialize
  client.initialize();
};

module.exports = { allSessions, connectClient };
