const Discord = require("discord.io");
const database = require("../database.json");
const sqlcon = require("../sql_serverconnection.js");
const mysql = require("mysql");
    module.exports = {
        name: 'ban',
        description: 'a final solution',
        usage: '<@ user>',
        guildOnly: 'true',
        aliases: ['die','bye'],
        category: "moderating",
        execute(client,message, args) {
            //check perms
            if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply('perm Denied');
            if (!message.guild.me.hasPermission("BAN_MEMBERS"))return message.reply('perm 2 Denied');
            //check if a person was mentioned
            if (!message.mentions.users.size) {
                return message.reply(`you need to tag a user in order to make em walk the plank ARRRR\nlike this <-kick @user>`);
            }
               
            //assing mention and check if true
    var member= message.mentions.members.first();
    if (!member) return message.reply('unable to find this person');
        if(args[1]){ var reason = args[1];}else {var reason = 'no reason given'}
    //check if mentioned member is mod
    if (member.hasPermission('MANAGE_MESSAGES')) return message.reply('this person is possibly a mod');
// bans member
member.ban
member.ban().then((member) => {
// Successmessage
message.channel.send(":man_police_officer: " + member.displayName + " has been successfully banned  :man_police_officer: ");
}).catch(() => {
// Failmessage
message.channel.send("error");
});
var con = mysql.createConnection({
    host: database.host,
    user: database.user,
    password: database.pwd,
    database:database.database
});
const embed = new Discord.MessageEmbed()
.setColor('#ff0000')
.setFooter(message.members.displayName,message.author.displayAvatarURL)
.setTimestamp()
.setDescription(`**BANNED:** ${member}\n
                Banned by: ${message.author}\n
                **Reason:** ${reason}`)
sqlcon.execute(con,member,5,embed);
        },
    };