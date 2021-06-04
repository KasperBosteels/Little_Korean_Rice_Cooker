const discord = require("discord.js");
const sqlcon = require("../sql_serverconnection.js");
    module.exports = {
        name: 'unwarn',
        description: 'Resets a users warnings(within server).',
        usage: '<@ user>',
        guildOnly: 'true',
        aliases: ['uw','unw','rw'],
        category: "moderating",
        async execute(client,message, args,con) {
       //#region default check
       if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply('You do not have permission to do this.');
       if (!args[0]) return message.reply('no user tagged');
       if (!message.guild.me.hasPermission('KICK_MEMBERS')) return message.reply('I do not have permission to do this.');
       var unwarnuser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
       if (!unwarnuser) return message.reply('no user found');
       //#endregion

    //delete warnings from sql server
    con.query(`DELETE FROM warnings WHERE userID = "${unwarnuser.id}" AND guildID = "${message.guild.id}"`);

    //#region embed
    con.query(`SELECT COUNT(*) AS number FROM warnings where userID = '${unwarnuser.id}' AND guildID = '${message.guild.id}';`,(err,rows,fields) => {amount = rows[0].number
    //#endregion
    try{let embed =makeEmbed(message,unwarnuser,amount)
    sqlcon.execute(con,unwarnuser,6,embed,message);
    return message.channel.send(embed);

    }catch(err){
    return console.log(err);
    }
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