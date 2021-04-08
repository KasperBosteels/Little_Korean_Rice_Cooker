const { MessageEmbed } = require('discord.js');
const imageSearch = require('image-search-google');
const recon = require('reconlx');
const ReactionPages = recon.ReactionPages;
//const { ReactionCollector } = require('discord.js-collector');
const TextPageChange = true;
const emojis = ["⏪", "⏩"];
const time = 60000;
const GoogleClient = new imageSearch(process.env.CSE_ID,process.env.GOOGLE_API_KEY);
const options = {page:1};
module.exports = {
	name: 'google',
	description: 'Search google for images.',
	cooldown: 1,
	usage: '<your query>',
	category: "fun",
    aliases: ['img'],
	async execute(client,message, args,con) {
    //#region google search
        let Q = args.join(" ");
        var list = [];
        await GoogleClient.search(Q,options)
                .then(images =>{
                
                for (let i = 0; i < images.length; i++) {
                list[i] = MakeEmbed(images[i].url,message.member,i,images.length);
                }

        });
        ReactionPages(message,list,TextPageChange,emojis,time);    
        
    },
};

function MakeEmbed(url,member){
    let embed = new MessageEmbed()
    .setImage(url)
    .setAuthor(member.displayName,member.user.displayAvatarURL({dynamic: true, size: 4096}))
    .setColor('#00ff00');
    return embed
}
