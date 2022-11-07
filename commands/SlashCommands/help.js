const help = require("../helpV2");
const { ApplicationCommandType } = require("discord-api-types/v9");

module.exports = {
  name: "help",
  description: "A handy guide for the bot.",
  type: ApplicationCommandType.ChatInput,
  dmPermission: true,
  defaultMemberPermissions: [],
  async execute(client, interaction, con) {
    await help.execute(client, interaction, [], null, null, null);
  },
};
