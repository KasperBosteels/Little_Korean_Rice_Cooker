const controlLevel = require("./leveling_enabled").GET;
const G = require("./Generators/GenerateSimpleEmbed").GenerateEmbed;
const controlPrefix = require("./getprefixData").GET;
const updateprefix = require("./commands/changeprefix").update;
const updateLevel = require("./commands/leveling").update;
module.exports = {
  async execute(interaction, con) {
    console.log(interaction);
    let prefixchange = false,
      level = false;

    switch (interaction.customId) {
      case "configModal":
        const prefix = interaction.fields.getTextInputValue("pid");
        const levelsystem = await interaction.fields.getField("lsid").values;
        console.log(levelsystem);
        const currentlevelstatus = controlLevel(interaction.guildId);
        if (prefix != controlPrefix(interaction.guild.id)) {
          prefixchange = await updateprefix(interaction.guild.id, prefix);
        }
        if (
          (levelsystem == "1" && !currentlevelstatus) ||
          (levelsystem == "0" && currentlevelstatus)
        ) {
          level = updateLevel(interaction.guildId, levelsystem);
        }
        await interaction.editReply({
          embeds: [
            G(
              "RANDOM",
              `current prefix changed: ${prefixchange}\nlevel system status changed: ${level}`
            ),
          ],
        });
        break;
      case "sendmessage":
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
        break;
    }
  },
};
