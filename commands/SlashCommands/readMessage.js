const G = require("../../Generators/GenerateSimpleEmbed").GenerateEmbed;
const { ApplicationCommandType, MessageFlags } = require("discord.js");
module.exports = {
  name: "read_mail",
  description: "Read all messages you send or received from the developers.",
  type: ApplicationCommandType.ChatInput,
  dmPermission: true,
  defaultMemberPermissions: ["SendMessages", "ViewChannel"],

  async execute(client, interaction, con) {
    // Messages live in the Messages table, linked to their author via the
    // memberUserId foreign key. Query it directly and parameterised (no string
    // interpolation), then render whatever we find.
    const rows = await con.query(
      "SELECT topic, message FROM Messages WHERE memberUserId = ?",
      [`${interaction.user.id}`]
    );
    const embed = G("#0000ff", false, false, false, true, false, "Your messages");
    if (!rows || rows.length === 0) {
      embed.setDescription("You don't have any messages yet.");
    } else {
      rows.forEach((row) => {
        embed.addFields({
          name: `${row.topic || "(no topic)"}`,
          value: `${row.message}`,
          inline: false,
        });
      });
    }
    return interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
  },
};
