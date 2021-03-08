const Discord = require('discord.js');
const sendembed = require("../sql_serverconnection.js");
    module.exports = {
        name: 'kick',
        description: 'kick user',
        usage: '<@user>',
        guildOnly: 'true',
        category: "moderating",
        execute(client,message, args,con) {
           //check perms or if there is a mention 
            if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply('perm Denied');
            if (!message.guild.me.hasPermission("KICK_MEMBERS"))return message.reply('perm 2 Denied');
            if (!message.mentions.users.size) {
                return message.reply(`you need to tag a user in order to make em walk the plank ARRRR\nlike this <-kick @user>`);
            }

            //get mention and check if user wass succesfully found
    var member= message.mentions.members.first();
    if (!member) return message.reply('unable to find this person');

    //check if user is a mod
    if (member.hasPermission('MANAGE_MESSAGES')) return message.reply('this person is possibly a mod');
// Kick
member.kick().then((member) => {
// Successmessage
message.channel.send(":wave: " + member.displayName + " has been successfully kicked :woman_cartwheeling: :person_golfing: ");
}).catch(() => {
// Failmessage
message.channel.send("error");
});
var reason = "no reason given";
if(args[1])reason = args[1];
sendembed.execute(con,member,5,MakeEmbed(member,reason),message);
},
};
function MakeEmbed(reason,member){
    var embed = new Discord.MessageEmbed()
.setTitle(`${member.displayName} has been kicked`)
.setDescription(`reason: ${reason}`)
.setTimestamp()
.setAuthor('Little_Korean_Rice_Cooker','https://i.imgur.com/A2SSxSE.png');
return embed;

}