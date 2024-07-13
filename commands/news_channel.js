const { PermissionsBitField } = require("discord.js");
const news_channel = require("../DataHandlers/news_chhannel");
module.exports = {
    name: "news_channel",
    description:
        "Use this command in the channel you want news messages to appear, if you want to stop use disable after the command.",
    cooldown: 1,
    usage: "<disable>(optional)",
    guildOnly: "true",
    aliases: [
        "news",
        "newschannel",
        "news_channel",
        "news-channel",
    ],
    category: "config",
    perms: ["SendMessages"],
    userperms: ["Administrator"],
    async execute(client, message, args, con) {
        //check perms
        if (!permission(message))
            return message.reply({
                content: "Only an administrator is able to execute this command.",
            });
        //assigns id to variables and check if received
        var channel = message.channel.id;
        var guild = message.guild.id;
        if (!channel) return console.log("no channel");
        if (!guild) return console.log("no guild");
        try {
            if (args[0] && args[0].toLowerCase() == "disable") {
                await con.manager.update("Guilds", { guild_id: guild }, { news_channel: false, news_channelId: null });
                message.channel.send({
                    content: "i will no longer send news here",
                });
            } else {
                await con.manager.update("Guilds", { guild_id: guild }, { news_channel: true, news_channelId: `${channel}` })
                message.channel.send({
                    content: "i will send news here now",
                });
            }
        }
        catch (error) {
            console.error(error);
        }
        await news_channel.execute(con);
    }



}

function permission(message) {
    //check perms
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
        return false;
    }
    return true;
}
