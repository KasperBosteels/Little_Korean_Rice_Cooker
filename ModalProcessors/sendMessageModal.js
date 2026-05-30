const G = require("../Generators/GenerateSimpleEmbed").GenerateEmbed;
const ensure = require("../DataHandlers/ensureRegistered.js");
module.exports = {
  async execute(interaction, con) {
    const mailTopic = interaction.fields.getTextInputValue("tid");
    const MailMessage = interaction.fields.getTextInputValue("mid");
    let embed = G(
      "#0000ff",
      `topic: "${mailTopic}"\nmessage: "${MailMessage}"`,
      false,
      false,
      true,
      false,
      "Your message was send."
    );
    // Make sure the author has a row, then persist the message linked to them.
    // (TypeORM's save() with a partial relation sets the memberUserId FK.)
    await ensure.ensureUser(con, interaction.user);
    await con.manager.getRepository("Message").save({
      topic: mailTopic,
      message: MailMessage,
      member: { user_id: `${interaction.user.id}` },
    });
    await interaction.editReply({ embeds: [embed] });
  },
};
