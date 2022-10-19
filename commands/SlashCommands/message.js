const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  ModalBuilder,
  MessageActionRow,
  TextInputComponent,
} = require("discord.js");
const confirm = require("../../leveling_enabled").CONFIRM;
module.exports = {
  data: new SlashCommandBuilder()
    .setName("mail")
    .setDefaultPermission(true)
    .setDescription("send a message to the developer.")
    .addStringOption((option) =>
      option
        .setName("topic")
        .setDescription("the topic for your email.")
        .setRequired(false)
    ),
  async execute(client, interaction, con) {
    if (confirm(interaction.guild.id)) currentLevelStatus = "enabled";
    const modal = new ModalBuilder()
      .setCustomId("sendmessage")
      .setTitle("send mail");
    let topicComponent = new TextInputComponent()
      .setCustomId("tid")
      .setLabel(`topic`)
      .setStyle("SHORT");
    if (interaction.options.getString("topic")) {
      topicComponent.value = interaction.options.getString("topic");
    } else {
      topicComponent.setPlaceholder("this messages topic.");
    }
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
