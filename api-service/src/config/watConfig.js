// const { Client, RemoteAuth } = require("whatsapp-web.js");

// // Require database
// const { MongoStore } = require("wwebjs-mongo");
// const mongoose = require("mongoose");

// mongoose
//   .connect(
//     `mongodb+srv://contactdevsamy:Delate4meM@cluster0.phjqqrf.mongodb.net/?retryWrites=true&w=majority`
//   )
//   .then(() => {
//     const store = new MongoStore({ mongoose: mongoose });
//     const client = new Client({
//       authStrategy: new RemoteAuth({
//         store: store,
//         backupSyncIntervalMs: 300000,
//       }),
//     });

//     client.initialize();
//   });

const { Client, LocalAuth } = require("whatsapp-web.js");

const client = new Client({
  authStrategy: new LocalAuth({
    dataPath: "Sessions",
  }),
});

module.exports = { client };
