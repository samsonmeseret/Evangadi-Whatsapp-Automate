const listGroup = async (client, io) => {
  io.on("getChats", () => {
    client
      .getChats()
      .then((chats) => {
        // console.log(first)
        let groups = chats.filter((chat) => chat.isGroup == true);
        io.emit("chats", { groups });
      })
      .catch((err) => {
        console.log(err);
      });
  });
  //  client.on("ready", () => {
  //    console.log("Client is ready !");
  //    io.emit("listGroups", "Client is ready !");
  // //    allSessions[clientId] = client;
  //  });
};

module.exports = { listGroup };
