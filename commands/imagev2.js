const { MessageEmbed } = require('discord.js');
const imageSearch = require('image-search-google');
const { Menu } = require('discord.js-menu')
const emojis = ["⏪", "⏩"];
const time = 60000;
const GoogleClient = new imageSearch(process.env.CSE_ID,process.env.GOOGLE_API_KEY);
const options = {page:1};
module.exports = {
	name: 'google',
	description: 'Search google for images.',
	cooldown: 5,
	usage: '<your query>',
	category: "fun",
    aliases: ['img'],
	async execute(client,message, args,con) {
    //#region google search
        let Q = args.join(" ");
        var list = [];
        try{
        await GoogleClient.search(Q,options)
                .then(images =>{
                
                for (let i = 0; i < images.length; i++) {
                list[i] = MakeEmbed(images[i].url,message.member,i,images.length);
                }
                

        });
        let googleMenu = new Menu(message.channel,message.author.id,[
            {
                name:"1",
                content:list[0],
                reactions:{
                    '⏪':'previous',
                    '⏩':'next'
                }
            },{
                name:"2",
                content:list[1],
                reactions:{
                    '⏪':'previous',
                    '⏩':'next'
                }                        
            },{
                name:"3",
                content:list[2],
                reactions:{
                    '⏪':'previous',
                    '⏩':'next'
                }                        
            },{
                name:"4",
                content:list[3],
                reactions:{
                    '⏪':'previous',
                    '⏩':'next'
                }                        
            },{
                name:"5",
                content:list[4],
                reactions:{
                    '⏪':'previous',
                    '⏩':'next'
                }                        
            },{
                name:"6",
                content:list[5],
                reactions:{
                    '⏪':'previous',
                    '⏩':'next'
                }                        
            },{
                name:"7",
                content:list[6],
                reactions:{
                    '⏪':'previous',
                    '⏩':'next'
                }                        
            },{
                name:"8",
                content:list[7],
                reactions:{
                    '⏪':'previous',
                    '⏩':'next'
                }                        
            },{
                name:"9",
                content:list[8],
                reactions:{
                    '⏪':'previous',
                    '⏩':'next'
                }                        
            },{
                name:"10",
                content:list[9],
                reactions:{
                    '⏪':'previous',
                    '⏩':'next'
                }                        
            }
        ],time);
        googleMenu.start();
        googleMenu.on('pageChange',destination=>{
            //nothing here yet
        })
        }
        catch(error){
            message.channel.send(`an error occured \nmessage: ${error.statusMessage}\n code: ${error.statusCode}`)
            console.log(error);
        }
    },
};

function MakeEmbed(url,member,i,l){
    let embed = new MessageEmbed()
    .setImage(url)
    .setAuthor(member.displayName,member.user.displayAvatarURL({dynamic: true, size: 4096}))
    .setColor('#00ff00')
    .setFooter(`page: ${i+1}/${l}`);
    return embed
}
