const discord = require('discord.js');
const imageSearch = require('image-search-google');
const {ReactionCollector} = require('discord.js-collector');
const GoogleClient = new imageSearch(process.env.CSE_ID,process.env.GOOGLE_API_KEY);
const options = {page:1};
module.exports = {
	name: 'google',
	description: 'when the other bot is down.',
	cooldown: 1,
	usage: '<your query>',
	category: "fun",
	async execute(client,message, args,con) {
    //#region google search
        let Q = args.join(" ");
        const list = [];
        await GoogleClient.search(Q,options)
                .then(images =>{
                for (let i = 0; i < images.length; i++) {
                list[i] =MakeEmbed(images[i].url,message.member,i,images.length);
            }  
        });
        //#endregion
        const botmessage = await message.reply(list[0]);
        //construct the paginator    
        ReactionCollector.paginator({
        botmessage,
        user: message.author,
        pages: list,
        collectorOptions: {
            time: 6000
        }
        }).catch(error => { return console.log(error);});
    },
};
function MakeEmbed(url,member,P,L){
    const embed = new discord.MessageEmbed()
    .setImage(url)
    .setAuthor(member.displayName,member.user.displayAvatarURL({dynamic: true, size: 4096}))
    .setTimestamp()
    .setDescription("google search result")
    .setFooter(`Page ${P+1}/${L}`)
    .setColor('#00ff00');
    return embed;
}