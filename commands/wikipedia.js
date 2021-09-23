const score = require('../socalCredit');
const wiki = require('wikipedia');
const discord = require('discord.js');
module.exports = {
	name: 'wikipedia',
	description: 'find a wikipedia article',
	cooldown: 1,
	usage: ' ',
	category: "fun",
    aliases:['wiki'],
	async execute(client,message, args,con) {
        if(!args[0])return message.reply('Seems you forgot to tell me what i need to look up. :/');
        let query = args.join(' ');
        try{
            const page = await wiki.page(query);
            const summary = await page.summary();
            let t = summary.displaytitle;
            let l = summary.content_urls.desktop.page;
            let te = summary.extract;
            message.channel.send({embeds:[makeEmbed(message,t,l,te)]});
        }catch(error){
            console.log(error)
            message.channel.send(error)
        }
		score.ADD(con,1,message.author.id)
	},
};
function makeEmbed(message,title,link,text){
    var embed = new discord.MessageEmbed()
    .setColor('#0x8c8c8c')
    .setFooter(message.member.displayName)
    .setTimestamp()
    .setTitle(title)
    .setURL(`${link}`)
    .setThumbnail('https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fpngimg.com%2Fuploads%2Fwikipedia%2Fwikipedia_PNG18.png&f=1&nofb=1')
    .setDescription(`wikipedia result for ${title}`)
    .addField(title,text);
return embed
}