const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageSelectMenu, Message } = require("discord.js");
const { Modal, MessageActionRow, TextInputComponent } = require("discord.js");
const { GET } = require("../getprefixData");
const confirm = require("../leveling_enabled").CONFIRM;
module.exports = {
  data: new SlashCommandBuilder()
    .setName("config")
    .setDefaultPermission(true)
    .setDescription("Quickly apply basic configuration"),
  async execute(client, interaction, con) {
    if (confirm(interaction.guild.id)) currentLevelStatus = "enabled";
    const modal = new Modal()
      .setCustomId("configModal")
      .setTitle("Bot Configuration");
    let prefixcomponent = new TextInputComponent()
      .setCustomId("pid")
      .setLabel(`this servers prefix:`)
      .setPlaceholder(`${GET(interaction.guild.id)}`)
      .setStyle("SHORT");
    let levelcomponent = new MessageSelectMenu().setCustomId("lsid");
    if (confirm(interaction.guild.id)) {
      levelcomponent.addOptions([
        {
          label: "Enable level system",
          description: "Enable leveling in this server.",
          default: true,
          value: "1",
        },
        {
          label: "Disable level system",
          description: "Disable leveling in this server.",
          default: false,
          value: "0",
        },
      ]);
    } else {
      levelcomponent.addOptions([
        {
          label: "Enable level system",
          description: "Enable leveling in this server.",
          default: false,
          value: "true",
        },
        {
          label: "Disable level system",
          description: "Disable leveling in this server.",
          default: true,
          value: "false",
        },
      ]);
    }
    const firstAction = new MessageActionRow().addComponents(prefixcomponent);
    modal.addComponents(firstAction);
    await interaction.showModal(modal);
  },
};
