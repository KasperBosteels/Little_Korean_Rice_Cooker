const haiku = require('haiku-random');
const discord = require('discord.js');
module.exports = {
	name: 'haiku',
	description: 'receive a random haiku from a list of over 1500',
	cooldown: 1,
	usage: ' (optional: <number>)',
	category: "fun",
	async execute(client,message, args,con) {
        let smile = " ";
        if(args.length >0){
            let H = await haiku.specific(args[0]);
        H.forEach(line => {
            smile +=`${line}\n`
        });
        }else {
        let H = await haiku.random();
        H.forEach(line => {
            smile +=`${line}\n`
        });
        }
        return embedmaker(smile,message);
    },
};
function embedmaker(haiku,message){
var bed = new discord.MessageEmbed()
.setColor('#50C878')
.setAuthor('Little_Korean_Rice_Cooker','https://i.imgur.com/A2SSxSE.png')
.setTitle("a haiku for you")
.setDescription(haiku);
message.channel.send(bed);
}