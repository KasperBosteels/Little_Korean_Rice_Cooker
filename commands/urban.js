const ud = require('urban-dictionary');
const discord = require('discord.js');
module.exports = {
	name: 'urban',
	description: 'urban dictionary',
	cooldown: 1,
	usage: '<word> ',
    category: "fun",
	 execute(client,message, args,con) {
        let word = " ";
        for (let i = 0; i < args.length; i++) {
        word += `${args[i]} `;
        }
       if(word){
       return term(word,message.channel);
       
       }

	},
};
    function term(word,channel){
        let explain = ["undefined","undefined"];
    ud.term(word).then((result)=>{
       const entries = result.entries
        explain[0] =entries[0].definition
        explain[1] = entries[0].example
        sendembed(makeEmbed(word,explain[0],explain[1],discord),channel);
   }).catch((error)=>{
       console.error(error.message);
       if(error.code = 'ERR_WORD_UNDEFINED'){channel.send('perhaps the archives are incomplete...');}
   });

    
}
  function makeEmbed(word,def,example,discord){
    var embed = new discord.MessageEmbed();
    embed.setTitle(`definition for: ${word}`);
    embed.setDescription(def);
    embed.addField('example',example);
    embed.setAuthor("Urban Dictionary");
    return embed;

}
function sendembed(embed,channel){
    return channel.send(embed);
}