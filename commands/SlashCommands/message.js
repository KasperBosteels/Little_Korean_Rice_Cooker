const {
  ApplicationCommandOptionType,
  ApplicationCommandType,
} = require("discord-api-types/v9");
const {
  ModalBuilder,
  MessageActionRow,
  TextInputComponent,
} = require("discord.js");
const confirm = require("../../DataHandlers/leveling_enabled").CONFIRM;
module.exports = {
  name: "mail",
  description: "Send a message to de developers",
  type: ApplicationCommandType.ChatInput,

  command: {
    enabled: true,
    slashCommand: {
      enabled: true,
      ephemeral: true,
      dmPermission: true,
      options: [
        {
          type: ApplicationCommandOptionType.String,
          name: "topic",
          description: "the topic for your email",
          required: false,
          maxLength: 255,
        },
      ],
    },
  },
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
