const { ApplicationCommandType, ApplicationCommandOptionType, PermissionsBitField } = require("discord.js");
const ai_enabled = require("../../DataHandlers/ai_enabled");

module.exports = {
  name: "ai",
  description: "enable or disable the AI features for this server",
  type: ApplicationCommandType.ChatInput,
  dmPermission: false,
  options: [
    {
      type: ApplicationCommandOptionType.String,
      required: true,
      name: "action",
      description: "enable or disable",
      choices: [
        { name: "enable", value: "enable" },
        { name: "disable", value: "disable" }
      ]
    }
  ],
  defaultMemberPermissions: [PermissionsBitField.Flags.Administrator],
  async execute(client, interaction, con) {
    let guildID = interaction.guild.id;
    let action = interaction.options.getString("action");

    if (action === "disable") {
      const g = await con.manager.findOneBy("Guild", { guild_id: guildID });
      if (g) {
          g.guild_chatbot = false;
          await con.manager.save("Guild", g);
      }
      await ai_enabled.execute(con);
      return interaction.reply({ content: "AI features are now disabled for this server." });
    } else {
      const g = await con.manager.findOneBy("Guild", { guild_id: guildID });
      if (g) {
          g.guild_chatbot = true;
          await con.manager.save("Guild", g);
      }
      await ai_enabled.execute(con);
      return interaction.reply({ content: "AI features are now enabled for this server." });
    }
  },
};
