const { Client, RemoteAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
// Require database
const { MongoStore } = require("wwebjs-mongo");
const mongoose = require("mongoose");

const authenticatedWhatsappClient = async (req, res, next) => {
  mongoose
    .connect(
      `mongodb+srv://samiCoca:Delate4meM@cluster0.phjqqrf.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => {
      const store = new MongoStore({ mongoose: mongoose });
      const client = new Client({
        authStrategy: new RemoteAuth({
          store: store,
          backupSyncIntervalMs: 300000,
        }),
      });

      client.on("qr", (qr) => {
        qrcode.generate(qr, { small: true }, function (qrcode) {
          req.qr = qrcode;
          req.client = client;
          console.log(qrcode);
          next();
        });
      });

      //   client.on("authenticated", (session) => {
      //     next();
      //   });
      console.log("Db connected successfully");
      client.initialize();
    });
};
