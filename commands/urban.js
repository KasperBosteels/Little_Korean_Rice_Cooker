const ud = require('urban-dictionary');
const discord = require('discord.js');
module.exports = {
	name: 'urban',
	description: 'Urban Dictionary.',
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
        
    ud.define(word).then((result)=>{
        explain[0] =result[0].definition
        explain[1] = result[0].example
        sendembed(makeEmbed(word,explain[0],explain[1],discord),channel).catch((error)=>{
            if(error.code = 50035)return channel.send('The definition of this word is too big for discord, sorry.');
        });
   }).catch((error)=>{
       if(error.code = 'ERR_WORD_UNDEFINED'){return channel.send('perhaps the archives are incomplete...')}else{
        console.error(error);
       
    }
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