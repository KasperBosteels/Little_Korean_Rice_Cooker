const haiku = require('haiku-random');
const discord = require('discord.js');
const score = require('../socalCredit');
var hard_Haiku = [`You're a vast ocean,\nSo oddly terrifying\nSuch a strange comfort.\nby Achi`]
module.exports = {
	name: 'haiku',
	description: 'Receive a random haiku from a list of over 1500.',
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
        if (Math.floor(Math.random() * 10)+1 === 1){
            smile = hard_Haiku[Math.floor(Math.random()*hard_Haiku.length)];
        }
        embedmaker(smile,message);
        try{
            score.ADD(con,10,message.author.id)
        }catch(err){
            console.log(err);
        }
    },
};
function embedmaker(haiku,message){
var bed = new discord.MessageEmbed()
.setColor('#50C878')
.setAuthor('Little_Korean_Rice_Cooker','https://i.imgur.com/A2SSxSE.png')
.setTitle("a haiku for you")
.setDescription(haiku);
message.channel.send({embeds:[bed]});
}