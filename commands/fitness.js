const Discord = require('discord.js');
const Nsfw = require('discord-nsfw');
const nsfw = new Nsfw();
const content= require('../jsonFiles/swearwords.json');
const nonsfw = require('../sub-commands/nudes.js');
const choise = content.lewd;
module.exports = {
	name: 'lewd',
	description: 'ever put a cat in a microwave ?',
	cooldown: 1,
	usage: ' optional: <your preference>',
	category: "fun",
	specifics: choise,
	 async execute(client,message, args) {
		 if(!message.channel.nsfw)return message.channel.send(nonsfw.execute());
		if(!args[0]) args[0] = choise[Math.floor(Math.random() * Math.floor(choise.length))];
		var arr=[];
		for (let a = 0; a < args.length; a++) {
			arr[a] = args[a].toLowerCase();	
		}
		const argscommand = args[0];
		const commandName = argscommand.toLowerCase();
		const command = client.subcommands.get(commandName);
		if(!command){
			return message.channel.send(await preference(Discord,false));
		}
		try{
			let link = await command.execute(nsfw);
			message.channel.send(await preference(Discord,link));
		}catch (error){
			console.log(error);
			return message.channel.send('error occured');
		}
		

		
		
	},
};
async function preference(Discord,link){
	let lewdnes="https://imgur.com/gpt2PFh.png";
	const embed = new Discord.MessageEmbed();
	if(link) {lewdnes = link;
		embed.setImage(lewdnes);
		}else{
			embed.setDescription("could you ask that again ?");
			embed.setThumbnail("https://imgur.com/gpt2PFh.png?size=8");
		}
	return embed;
}
