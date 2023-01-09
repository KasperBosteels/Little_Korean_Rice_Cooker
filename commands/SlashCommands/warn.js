const {
  ApplicationCommandOptionType,
  ApplicationCommandType,
} = require("discord-api-types/v9");
const { GenerateEmbed } = require("../../Generators/GenerateSimpleEmbed");
const { logWithNoMember } = require("../../sendToLogChannel");
module.exports = {
  name: "warn",
  description:
    "Warn a user.\nWarnings will be saved so you can see them later on.",
  defaultMemberPermissions: ["ModerateMembers"],
  type: ApplicationCommandType.ChatInput,
  defaultMemberPermissions:["ModerateMembers"],
  dmPermission: false,
  options: [
    {
      type: ApplicationCommandOptionType.User,
      required: true,
      name: "user",
      description: "The User you want to warn",
    },
    {
      type: ApplicationCommandOptionType.String,
      required: false,
      name: "reason",
      description: "The reason for this warning.",
    },
  ],

  async execute(client, interaction, con) {
    let member = await interaction.options.getMember("user");
    let reason = "no reason given";
    if (interaction.option.getString("reason")) {
      reason = await interaction.option.getString("reason");
    }
    await con.manager.insert("Warnings",{guild:interaction.guildId,user:member.id,warning_message:reason});
    await con.manager.findBy("Warnings",{user:member.id,guild:interaction.guildId}).then(async (warns)=>{
      const count = warns.length;
      var embed = GenerateEmbed(
        "#ff0000",
        `**warned:** ${member}\n **warned by:** ${interaction.author} **reason:** ${reason}`,
        false,
        [{ name: "warning: ", value: `${count}` }]
      );
      try {
        logWithNoMember(embed, interaction);
      } catch (err) {
        return console.log(err);
      } finally {
        await interaction.reply({ embeds: [embed] });
      }
    });
  }
};
