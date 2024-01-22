const listGroup = (client, io) => {
  io.on("getChats", () => {
    client
      .getChats()
      .then((chats) => {
        // console.log(chats);
        let groups = chats.filter((chat) => chat.isGroup == true);
        io.emit("chats", { groups });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

module.exports = { listGroup };
