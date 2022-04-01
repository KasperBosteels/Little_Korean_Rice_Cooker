const discord = require("discord.js");
const embedlogger = require("./sendToLogChannel");
const logger = require("./logger");
const socialcreddit = require("./socalCredit");
const customwelcome = require("./welcome_message_data_collector");
module.exports = {
  async guildjoin(member, client, con) {
    let custommessage = await createCustomMessage(member);
    var embed = new discord.MessageEmbed()
      .setColor("#006400")
      .setTitle("hello")
      .setTimestamp()
      .setAuthor({
        name: "Little_Korean_Rice_Cooker",
        url: "https://discord.com/api/oauth2/authorize?client_id=742037772503744582&permissions=1514516376694&scope=bot",
        iconURL: "https://i.imgur.com/A2SSxSE.png",
      })
      .setThumbnail(
        member.user.avatarURL({ dynamic: true, format: "png", size: 64 })
      );
    if (custommessage == false) {
      embed.setDescription(`welcome, ${member.displayName}`);
    } else {
      embed.setDescription(`${custommessage}`);
    }
    try {
      await embedlogger.log_new_user(member, embed, member.guild.id, client);
      await logger.LEAVE_JOINLOG(undefined, member.guild, "USER JOINED SERVER");
    } catch (err) {
      console.log(err);
      await logger.LEAVE_JOINLOG(err, member.guild, "USER JOINED SERVER");
    }
    socialcreddit.ADDUSER(con, member.id);
  },
  async guildleave(member, con) {
    let banned = await member.guild.bans.fetch(member).catch((error) => {
      if (error.code != 10026) {
        console.log(error);
      } else {
        return false;
      }
    });
    var embed = new discord.MessageEmbed()
      .setTimestamp()
      .setAuthor({
        name: "Little_Korean_Rice_Cooker",
        url: "https://discord.com/api/oauth2/authorize?client_id=742037772503744582&permissions=1514516376694&scope=bot",
        iconURL: "https://i.imgur.com/A2SSxSE.png",
      })
      .setThumbnail(
        member.user.avatarURL({ dynamic: true, format: "png", size: 64 })
      );
    if (banned) {
      if (banned.reason == null) {
        embed.addField(
          ":warning: **BANNED** :warning:",
          `\`\`\`no reason provided\`\`\``
        );
      } else {
        embed.addField(
          ":warning: **BANNED** :warning:",
          `\`\`\`${banned.reason}\`\`\``
        );
      }
      embed
        .setTitle("good riddance!")
        .setDescription(`${member.displayName} won't be missed.`)
        .setColor("#FF0000");
      await logger.LEAVE_JOINLOG(undefined, member.guild, "USER BANNED");
      socialcreddit.SUBTRACT(con, 500, member.id);
    } else {
      embed
        .setTitle("oh no")
        .setDescription(`${member.displayName} left`)
        .setColor("#FFA500");
      await logger.LEAVE_JOINLOG(undefined, member.guild, "USER LEFT SERVER");
    }
    try {
      await embedlogger.embedWithLog(member, embed, false);
    } catch (err) {
      console.log(err);
    }
  },
};
async function createCustomMessage(member) {
  let message = await customwelcome.GET(member.guild.id);
  if (message == false) return false;
  message = await message
    .replace("{user}", "" + member.displayName + "")
    .replace("{server}", "" + member.guild.name + "");
  return message;
}
