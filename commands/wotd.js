const ud = require('urban-dictionary');
const discord = require('discord.js');
module.exports = {
	name: 'wotd',
	description: 'word of the day',
	cooldown: 1,
	usage: ' ',
    category: "fun",
	 async execute(client,message, args,con) {
        await term(message);
       return;

	},
};
    function term(message){
      
        ud.wordsOfTheDay().then((results,error)=>{
            if(error)return console.error(error.message);
            let coin = Math.floor(Math.random() * Math.floor(results.length))
            sendembed(makeEmbed(results[coin].word,results[coin].definition,results[coin].example,results[coin].permalink,discord),message.channel);
        }).catch((error)=>{
            console.error(error);
        })

    
}
  function makeEmbed(word,def,example,link,discord){
    var embed = new discord.MessageEmbed();
    embed.setTitle(`word of the day: ${word}`);
    embed.setDescription(def);
    embed.addField('example',example);
    embed.setAuthor("Urban Dictionary");
    embed.setURL(link)
    return embed;

}
function sendembed(embed,channel){
    return channel.send(embed);
}