const alarm = require('./nudes.js');
const Nsfw = require('discord-nsfw');
const Discord = require('discord.js');
const nsfw = new Nsfw();
const choise= [
	"anal",
	"fourk",
	"ass",
	"gonewild",
	"pgif",
	"pussy",
	"thigh",
	"boobs",
	"hentaiass",
	"hentai",
	"hmidriff",
	"hentaithigh",
	"erokemo",
	"kitsune",
	"lewd",
	"nekofeet",
	"nekopussy",
	"nekotits",
	"solo",
	"wallpaper"]
module.exports = {
	name: 'lewd',
	description: 'ever put a cat in a microwave ?',
	cooldown: 1,
	usage: ' <your preference>',
	category: "fun",
	specifics: choise,
	async execute(client,message, args) {
		if(!args[0]) args[0] = choise[Math.floor(Math.random() * Math.floor(choise.length))];
		var arr=[];
		for (let a = 0; a < args.length; a++) {
			arr[a] = args[a].toLowerCase();
			
		}
        if(!message.channel.nsfw)return alarm.execute(client,message,arr);
		 return message.channel.send(await preference(arr,Discord,message));                                    
	},
};
async function preference(args,Discord,message){
	const embed = new Discord.MessageEmbed()
	var lewdnes = "not found sorry";
	switch(args[0]){
		
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
				case 'ass':
					lewdnes = await  nsfw.ass();
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
			 case 'hmid':
				 lewdnes = await  nsfw.hmidriff();
				 break;
				 case 'hthigh':
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
	embed.setImage(lewdnes);
	return embed;
}
