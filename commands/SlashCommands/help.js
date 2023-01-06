const { ApplicationCommandType,ApplicationCommandOptionType } = require("discord-api-types/v9");
const HelpSelectMenu = require("../../SelectMenus/HelpSelectMenu");
const GenerateEmbed = require("../../Generators/GenerateSimpleEmbed").GenerateEmbed;
const prefix = require("../../DataHandlers/getprefixData").GET;
module.exports = {
  name: "help",
  description: "A handy guide for the bot.",
  type: ApplicationCommandType.ChatInput,
  dmPermission: true,
  options: [
    {
      type: ApplicationCommandOptionType.String,
      required:false,
      name:"command",
      description:"Details about a specific command."
    }
  ],
  defaultMemberPermissions: [],
  async execute(client, interaction, con) {
  const specific = interaction.options.getString("command");
  if(!specific)return await HelpSelectMenu.execute(client,interaction,0);
  const requestedCommand = client.commands.filter(c=>c.name===specific);
  const prefix = prefix(interaction.guild.id);
  const Embed = GenerateEmbed("RANDOM",`placeholder text`,false,[{name:prefix+requestedCommand.name,value:requestedCommand.usage}],false,false,"details about: "+prefix+specific,false,false);
  return await interaction.reply({embeds:[Embed], ephemeral:false});
  },
};
