const { ApplicationCommandType } = require("discord-api-types/v9");
const HelpSelectMenu = require("../../SelectMenus/HelpSelectMenu");
module.exports = {
  name: "help",
  description: "A handy guide for the bot.",
  type: ApplicationCommandType.ChatInput,
  dmPermission: true,
  defaultMemberPermissions: [],
  async execute(client, interaction, con) {
  await HelpSelectMenu.execute(client,interaction,0)
  },
};
