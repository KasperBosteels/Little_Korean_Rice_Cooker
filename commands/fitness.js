const alarm = require('./nudes.js');
const akaneko = require('akaneko');
module.exports = {
	name: 'lewd',
	description: 'ever put a cat in a microwave ?',
	cooldown: 1,
	usage: ' <your preference>',
	category: "fun",
	specifics: [" ass"," blowjob"," cum"," doujin"," feet"," femdom"," foxgirl"," gifs"," glasses"," hentai"," netorare"," maid"," masturbation"," orgy"," panties"," pussy"," tentacles"," thighs"," ugly"," neko"," foxy"," bomb"," wallpaper"," mobile"],
	async execute(client,message, args) {
        if(!message.channel.nsfw)return alarm.execute(client,message,args);
		return message.channel.send(await preference(args));
	},
};
async function preference(args){
	var lewdnes;
	switch(args[0]){
		
		case 'ass':
		 lewdnes= await akaneko.nsfw.ass();
		break;
			/*case 'bsm':
			lewdnes= await akaneko.nsfw.bdsm();
			break;
			*/
			case'blowjob':
			lewdnes= await akaneko.nsfw.blowjob();
			break;
			case 'cum':
				lewdnes= await akaneko.nsfw.cum();
			break;
			case 'doujin':
				lewdnes = await akaneko.nsfw.doujin();
				break;
				case 'feet':
					lewdnes = await akaneko.nsfw.feet();
					break;
			case 'femdom':
				lewdnes= await akaneko.nsfw.femdom();
			break;
			case 'foxgirl':
				lewdnes = await akaneko.nsfw.foxgirl();
				break;
			case 'gifs':
				lewdnes= await akaneko.nsfw.gifs();
			 break;
			 case 'glasses':
				lewdnes= await akaneko.nsfw.glasses();
			 break;
			 case 'hentai': 
			 lewdnes= await akaneko.nsfw.hentai();
			 break;
			 case 'netorare':
				lewdnes= await akaneko.nsfw.netorare();
			 break;
			 case 'maid':
				 lewdnes = await akaneko.nsfw.maid();
				 break;
				 case 'masturbation':
					 lewdnes = await akaneko.nsfw.masturbation();
					 break;
			 case 'orgy':
				lewdnes= await akaneko.nsfw.orgy();
			 break;
			 case 'panties':
				 lewdnes = await akaneko.nsfw.panties();
				 break;
			 case 'pussy': 
			 lewdnes= await akaneko.nsfw.pussy();
			 break;
			 case 'tentacles': 
			 lewdnes= await akaneko.nsfw.tentacles();
			 break;
			 case 'thighs': 
			 lewdnes= await akaneko.nsfw.thighs();
			 break;
			 case 'ugly':
				 lewdnes = await akaneko.nsfw.uglyBastard()
				 break;
			 /*case 'uniforms': 
			 lewdnes= await akaneko.nsfw.uniforms();
			 break;
			 */
			 case 'neko':
				lewdnes= await akaneko.neko();
			 break;
			 case 'foxy':
				lewdnes= await akaneko.lewdNeko();
			 break;
			 case 'bomb':
				lewdnes= await akaneko.lewdBomb();
			 break;
			 case 'wallpaper':
			 lewdnes = await akaneko.nsfw.wallpapers();
			 break;
			case 'mobile':
				lewdnes = await akaneko.nsfw.mobileWallpapers();
				break;
	}
	return lewdnes;
}