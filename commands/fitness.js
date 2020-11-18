const Discord = require('discord.js');
const Nsfw = require('discord-nsfw');
const nsfw = new Nsfw();
const choise= [
	"anal",
	"4k",
	"ass",
	"gonewild",
	"gif",
	"pussy",
	"thigh",
	"boobs",
	"hentaiass",
	"hentai",
	"hentaimidriff",
	"hentaithigh",
	"erokemo",
	"kitsune",
	"lewd",
	"nekofeet",
	"nekopussy",
	"nekotits",
	"solo"];
module.exports = {
	name: 'lewd',
	description: 'ever put a cat in a microwave ?',
	cooldown: 1,
	usage: ' optional: <your preference>',
	category: "fun",
	specifics: choise,
	 async execute(client,message, args) {
		if(!args[0]) args[0] = choise[Math.floor(Math.random() * Math.floor(choise.length))];
		var arr=[];
		for (let a = 0; a < args.length; a++) {
			arr[a] = args[a].toLowerCase();	
		}
		const argscommand = args[0];
		const commandName = argscommand.toLowerCase();
		const command = client.subcommands.get(commandName);
		if(!command)return;
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
	let lewdnes = "https://imgur.com/gpt2PFh.png";
	if(link) lewdnes = link;
	//#region switch shit
	/*switch(args[0]){
		
		case 'ass':
		 lewdnes= await  nsfw.ass();
		 
		break;
			case'anal':
			lewdnes= await  nsfw.anal();
			break;
			case '4k':
				lewdnes= await  nsfw.fourk();
			break;
			case 'gonewild':
				lewdnes = await  nsfw.gonewild();
				break;
			case 'pussy':
				lewdnes= await  nsfw.pussy();
			break;
			case 'thigh':
				lewdnes = await  nsfw.thigh();
				break;
			case 'gif':
				lewdnes= await  nsfw.pgif();
			 break;
			 case 'boobs':
				lewdnes= await  nsfw.boobs();
			 break;
			 case 'hentaiass': 
			 lewdnes= await  nsfw.hentaiass();
			 break;
			 case 'hentai':
				lewdnes= await  nsfw.hentai();
			 break;
			 case 'hentaimid':
				 lewdnes = await  nsfw.hmidriff();
				 break;
				 case 'hentaithigh':
					 lewdnes = await  nsfw.hentaithigh();
					 break;
			 case 'erokemo':
				lewdnes= await  nsfw.erokemo();
			 break;
			 case 'kitsune':
				 lewdnes = await  nsfw.kitsune();
				 break;
			 case 'lewd': 
			 lewdnes= await  nsfw.lewd();
			 break;
			 case 'nekofeet': 
			 lewdnes= await  nsfw.nekofeet();
			 break;
			 case 'nekopussy': 
			 lewdnes= await  nsfw.nekopussy();
			 break;
			 case 'nekotits':
				 lewdnes = await  nsfw.nekotits()
				 break;
			 case 'solo':
				lewdnes= await  nsfw.solo();
			 break;
			 
	}
	*/
			//#endregion
	const embed = new Discord.MessageEmbed();
	embed.setImage(lewdnes);
	return embed;
}
