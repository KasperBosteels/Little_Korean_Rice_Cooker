const Discord = require('discord.js');
const credit = require('../socalCredit');
module.exports = {
	name: 'whois',
	description: 'get acount details',
	cooldown: 2,
	usage: ' blank, user-id or @ user',
	category: "moderating",
	async execute(client,message, args,con) {
        let user,SCS

        user = getUserFromMention(args[0],client)
        if (!user)user = await getuserfromID(args[0],client);
        if (!args[0])user = message.author;
        //query data base score tabel
        con.query(`SELECT socialScore FROM score WHERE userID="${user.id}";`,(err,score)=>{
            if(err)return console.error(err);
            if(score.length){
                SCS = score[0].socialScore;
            }else{
                SCS = 10000;
                credit.ADDUSER(con,user.id);
            }

            //return with embed message
        return message.channel.send(makeEmbed(user,message,SCS))
        });
    }
    
};
function getUserFromMention(mention,client) {
    if (!mention)  return;
    if (mention.startsWith('<@') && mention.endsWith('>')) {
        mention = mention.slice(2, -1);
        if (mention.startsWith('!')) {
        mention = mention.slice(1);
        }
        return client.users.cache.get(mention);
        }
    }
async function getuserfromID(arg,client){
    if (!regexCheck(arg)){
        let user =await client.users.fetch(arg);
        return user;
    }
}
    function regexCheck(text){
        let rex = /[a-zA-Z]/g;
        if (rex.test(text)){
            return true;
        }else{
            return false;
        }
    }
    function makeEmbed(user,message,score){
        const embed = new Discord.MessageEmbed()
        .setColor('#00ff00')
        .setFooter(message.author.username,message.author.displayAvatarURL)
        .setTimestamp();
        embed.addField("username",user.username,inline=true);
        embed.addField("discriminator",user.discriminator,inline=true);
        embed.addField("id",user.id,inline=true);
        embed.addField("avatar",user.avatar,inline=true);
        embed.addField("bot",user.bot,inline=true);
        embed.addField("creation date",user.createdAt,inline=true);
        embed.setThumbnail(user.avatarURL({ dynamic: true, format: 'png', size: 64 }));
        embed.addField("social Credit",score,inline=true);
        return embed;
    }