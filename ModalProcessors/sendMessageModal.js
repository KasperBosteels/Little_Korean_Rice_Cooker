const G = require("../Generators/GenerateSimpleEmbed").GenerateEmbed;
const Message = require('../entity/Message');
const Member = require('../entity/User')
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
    let member =await con.manager.findOneBy(Member,{user:interaction.member.id});
    if(!member){
      member = new Member({
        user_id:interaction.member.id,
        user_name:interaction.member.displayName,
        user_level:0,
        is_ignored:false,
        user_experience:0,
        user_score:1000,
      });
    }
    const message = new Message({
      message:MailMessage,
      topic:mailTopic,
      channel_id:interaction.channelId,
      member:member,
      guild:null
    });
    con.manager.Message.save(message);
    await interaction.editReply({ embeds: [embed], ephemeral: true });
  },
};
