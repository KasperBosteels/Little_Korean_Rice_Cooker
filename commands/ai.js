const ai_enabled = require("../DataHandlers/ai_enabled");
const { PermissionsBitField } = require("discord.js");
const ensureRegistered = require("../DataHandlers/ensureRegistered");

module.exports = {
  name: "ai",
  description: "enable or disable the AI features for this server",
  cooldown: 3,
  usage: "<enable> / <disable>",
  category: "config",
  aliases: ["chatbot"],
  perms: ["SendMessages"],
  userperms: ["Administrator"],
  async execute(client, message, args, con) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator))
      return message.reply({ content: "you have no permission to do that." });

    let guildID = message.guild.id;
    if (!guildID) return message.reply({ content: "something went badly." });

    if (!args[0]) {
        return message.reply({ content: "Please specify `enable` or `disable`." });
    }

    let action = args[0].toLowerCase();

    await ensureRegistered.ensureGuild(con, message.guild);

    if (action === "disable") {
      await con.manager.findOneBy("Guild", { guild_id: guildID }).then(async (g) => {
        if (g) {
            g.guild_chatbot = false;
            await con.manager.save(g);
        }
      });
      await ai_enabled.execute(con);
      return message.channel.send({ content: "AI features are now disabled for this server." });
    } else if (action === "enable") {
      await con.manager.findOneBy("Guild", { guild_id: guildID }).then(async (g) => {
        if (g) {
            g.guild_chatbot = true;
            await con.manager.save(g);
        }
      });
      await ai_enabled.execute(con);
      return message.channel.send({ content: "AI features are now enabled for this server." });
    } else {
      return message.reply({ content: "Invalid argument. Use `enable` or `disable`." });
    }
  },
};
