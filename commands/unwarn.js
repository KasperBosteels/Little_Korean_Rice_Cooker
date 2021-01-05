const discord = require("discord.js");
const sqlcon = require("../sql_serverconnection.js");
    module.exports = {
        name: 'unwarn',
        description: 'resets a users warnings back to 0 (only the warnings in the current guild)',
        usage: '<@ user>',
        guildOnly: 'true',
        aliases: ['unwarn','uwarn','uw','unw','rw'],
        category: "moderating",
        async execute(client,message, args,con) {
       //#region default check
       if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply('perm 1 denied');
       if (!args[0]) return message.reply('no user tagged');
       if (!message.guild.me.hasPermission('KICK_MEMBERS')) return message.reply('perm 2 denied');
       var unwarnuser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
       if (!unwarnuser) return message.reply('no user found');
       //#endregion

    //delete warnings from sql server
    con.query(`DELETE FROM warnings WHERE userID = "${unwarnuser.id}" AND guildID = "${message.guild.id}"`);

    //#region embed
    con.query(`SELECT COUNT(*) AS number FROM warnings where userID = '${unwarnuser.id}' AND guildID = '${message.guild.id}';`,(err,rows,fields) => {amount = rows[0].number
    //#endregion
    sqlcon.execute(con,unwarnuser,6,makeEmbed(message,unwarnuser,amount),message);
    });
    },
};
function makeEmbed(message,unwarnuser,amount){
    var embed = new discord.MessageEmbed()
    .setColor('#ffa500')
    .setFooter(message.member.displayName)
    .setTimestamp()
    .setDescription(`**warn reset** ${unwarnuser}\n
    **reset by:** ${message.author}`)
    .addField(`amount of warns:`,amount,true)
return embed
}