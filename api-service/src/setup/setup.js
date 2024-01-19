const { Client, LocalAuth } = require("whatsapp-web.js");

class ClientConnector {
  constructor(clientId, ses) {
    this.client = new Client({
      puppeteer: {
        headless: false,
      },
      authStrategy: new LocalAuth({
        clientId,
      }),
    });
  }

  client() {
    return this.client;
  }
}

module.exports = { ClientConnector };
