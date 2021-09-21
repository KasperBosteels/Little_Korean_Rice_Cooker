const Discord = require('discord.js');
const sendembed = require("../sql_serverconnection.js");
const prefixGET = require('../getprefixData');
    module.exports = {
        name: 'kick',
        description: 'Kick a user.',
        usage: '<@user>',
        guildOnly: 'true',
        category: "moderating",
        execute(client,message, args,con) {
            let prefix = prefixGET.GET(message.guild.id);
           //check perms or if there is a mention 
            if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply('You need the permission to kick members.');
            if (!message.guild.me.hasPermission("KICK_MEMBERS"))return message.reply('I need the permission to kick members.');
            if (!message.mentions.users.size) {
                return message.reply(`You need to tag a user in order to make em walk the plank ARRRR!\nlike this <${prefix}kick @user>`);
            }

            //get mention and check if user wass succesfully found
    var member= message.mentions.members.first();
    if (!member) return message.reply("Didn't find that user.");

    //check if user is a mod
    if (member.hasPermission('MANAGE_MESSAGES')) return message.reply('This person is possibly a mod.');
// Kick
member.kick().then((member) => {
// Successmessage
message.channel.send(":wave: " + member.displayName + " has been successfully kicked. :woman_cartwheeling: :person_golfing: ");
}).catch(() => {
// Failmessage
message.channel.send("error");
});
var reason = "No reason given.";
if(args[1])reason = args[1];
sendembed.execute(con,member,5,MakeEmbed(member,reason),message);
},
};
function MakeEmbed(reason,member){
    var embed = new Discord.MessageEmbed()
.setTitle(`${member.displayName} has been kicked.`)
.setDescription(`reason: ${reason}`)
.setTimestamp()
.setAuthor('Little_Korean_Rice_Cooker','https://i.imgur.com/A2SSxSE.png');
return embed;

}