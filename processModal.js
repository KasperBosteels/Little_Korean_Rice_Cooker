const configModal = require("./ModalProcessors/configModal").execute;
const sendMessageModal = require("./ModalProcessors/sendMessageModal").execute;
module.exports = {
  async execute(interaction, con) {
    switch (interaction.customId) {
      case "configModal":
        configModal(interaction, con);
        break;
      case "sendmessage":
        sendMessageModal(interaction, con);
        break;
    }
  },
};
