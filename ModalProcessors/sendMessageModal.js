const G = require("./Generators/GenerateSimpleEmbed").GenerateEmbed;
module.exports = {
  async execute(interaction, con) {
    const mailTopic = interaction.fields.getTextInputValue("tid");
    const MailMessage = interaction.fields.getTextInputValue("mid");
    console.log(mailTopic, MailMessage);
    let embed = G(
      "#0000ff",
      `topic: "${mailTopic}"\nmessage: "${MailMessage}"`,
      false,
      false,
      true,
      false,
      "Your message was send."
    );
    con.query(
      `INSERT INTO user_messages (userID,userName,guildID,channelID,guildName,channelName,topic,message) VALUES("${interaction.member.id}","${interaction.member.displayName}","${interaction.guildId}","${interaction.channelId}","${interaction.guild.name}","${interaction.channel.name}","${mailTopic}","${MailMessage}");`,
      (err) => {
        if (err) return console.error(err);
      }
    );
    await interaction.editReply({ embeds: [embed], ephemeral: true });
  },
};
