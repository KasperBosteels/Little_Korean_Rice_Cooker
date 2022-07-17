const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageSelectMenu, Message } = require("discord.js");
const { Modal, MessageActionRow, TextInputComponent } = require("discord.js");
const { GET } = require("../getprefixData");
const confirm = require("../leveling_enabled").CONFIRM;
module.exports = {
  data: new SlashCommandBuilder()
    .setName("mail")
    .setDefaultPermission(true)
    .setDescription("send a message to the developer."),
  async execute(client, interaction, con) {
    if (confirm(interaction.guild.id)) currentLevelStatus = "enabled";
    const modal = new Modal().setCustomId("sendmessage").setTitle("send mail");
    let topicComponent = new TextInputComponent()
      .setCustomId("tid")
      .setLabel(`topic`)
      .setPlaceholder("this messages topic.")
      .setStyle("SHORT");
    let messageComponent = new TextInputComponent()
      .setCustomId("mid")
      .setLabel("message")
      .setPlaceholder("Your message.")
      .setStyle("PARAGRAPH");
    const topicAction = new MessageActionRow().addComponents(topicComponent);
    const messageAction = new MessageActionRow().addComponents(
      messageComponent
    );
    modal.addComponents(topicAction, messageAction);
    await interaction.showModal(modal);
  },
};
