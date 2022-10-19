const { ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
module.exports = {
  async execute(client, message, embeds) {
    const riws = new ActionRowBuilder().addComponents(
      new SelectMenuBuilder()
        .setCustomId("select")
        .setPlaceholder("Select help topic")
        .addOptions([
          {
            label: "Home",
            description: "1. Home",
            value: "home",
          },
          {
            label: "General",
            description: "2. General information.",
            value: "general",
          },
          {
            label: "Fun",
            description: "3. Funny commands.",
            value: "fun",
          },
          {
            label: "Music",
            description: "4. Musical commands.",
            value: "music",
          },
          {
            label: "Moderating",
            description: "5. Commands for moderation purposes.",
            value: "moderating",
          },
          {
            label: "Config",
            description: "6. Configuration of the bot?",
            value: "config",
          },
        ])
    );
    await message.reply({
      content: "ㅤ",
      ephemeral: true,
      embeds: [embeds[0]],
      components: [riws],
    });
    const collector = message.channel.createMessageComponentCollector({
      cmoponentType: "SELECT_MENU",
    });
    collector.on("collect", async (collected) => {
      if (collected.componentType != "SELECT_MENU") return;
      const value = collected.values[0];
      switch (value) {
        case "home":
          await collected.update({ embeds: [embeds[0]], ephemeral: true });
          break;
        case "general":
          await collected.update({ embeds: [embeds[1]], ephemeral: true });
          break;
        case "fun":
          await collected.update({ embeds: [embeds[2]], ephemeral: true });
          break;
        case "music":
          await collected.update({ embeds: [embeds[3]], ephemeral: true });
          break;
        case "moderating":
          await collected.update({ embeds: [embeds[4]], ephemeral: true });
          break;
        case "config":
          await collected.update({ embeds: [embeds[5]], ephemeral: true });
          break;
        default:
          await collected.update({ embeds: [embeds[0]], ephemeral: true });
          break;
      }
    });
  },
};
