const botconfig = require('../auth.json');
const content = require('../jsonFiles/swearwords.json');
const getprefix = require('../getprefixData.js');
const {MessageEmbed} = require('discord.js');
const recon = require('reconlx');
const ReactionPages = recon.ReactionPages;
var prefix = "-";
module.exports = {

	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: 'optional: [command name]',
    cooldown: 5,
    category: "general",
	execute(client,message, args) {
        prefix = this.guildprefix(message.guild.id);
        //checks if a specific command query was asked if not send dm withh all commmands
        if(!args.length && message.guild.me.hasPermission("ADD_REACTIONS","MANAGE_MESSAGES")){
        var commandlist = [];

        //for each command in commands folder get name description and category and usage
        client.commands.forEach(command =>{
            var constructor = {
                name: command.name,
                description: command.description,
                category: command.category,
                usage: command.usage
            }
            //assign values to command list array 
            commandlist.push(constructor);
        });
        //default markup
        
        let general = []
        let moderating = []
        let fun = []
        let debug =[]
        let music =[]
        let currency=[]
        //for the every command in the commandlist add values to a string from its category
for (let i = 0; i < commandlist.length; i++) {
    const command = commandlist[i];
    if(command['category'] == 'general'){
        general[i]=command;
    }else if (command['category'] == 'moderating') {
        moderating[i]=command;
    }else if (command['category'] == 'debug') {
        debug[i]=command;
    }else if (command['category'] == 'fun') {
        fun[i]=command;
    }else if(command['category'] == 'music'){
        music[i]=command;
    }else if(command['category'] == 'currency'){
        currency[i]=command;
    }
}

//put all category embeds in response array
var response = [firstPage(prefix),MakeEmbed(general,prefix),MakeEmbed(fun,prefix),MakeEmbed(music,prefix),MakeEmbed(moderating,prefix),MakeEmbed(debug,prefix)];
//dm the response string to the author if not possible send declined in channel
ReactionPages(message,response,true,["⏪", "⏩"],120000);



//if specific command was asked
}else if(!args.length ||args[0] == "index"||args[0] == "general"|| args[0] == "fun"|| args[0] == "music"|| args[0] == "config"|| args[0] == "moderating"){
//#region repeated code
var commandlist = [];

        //for each command in commands folder get name description and category and usage
        client.commands.forEach(command =>{
            var constructor = {
                name: command.name,
                description: command.description,
                category: command.category,
                usage: command.usage
            }
            //assign values to command list array 
            commandlist.push(constructor);
        });
        //default markup
        
        let general = []
        let moderating = []
        let fun = []
        let debug =[]
        let music =[]
        let currency=[]
        //for the every command in the commandlist add values to a string from its category
for (let i = 0; i < commandlist.length; i++) {
    const command = commandlist[i];
    if(command['category'] == 'general'){
        general[i]=command;
    }else if (command['category'] == 'moderating') {
        moderating[i]=command;
    }else if (command['category'] == 'config') {
        debug[i]=command;
    }else if (command['category'] == 'fun') {
        fun[i]=command;
    }else if(command['category'] == 'music'){
        music[i]=command;
    }else if(command['category'] == 'currency'){
        currency[i]=command;
    }
}
var response = [MakeEmbed(general,prefix),MakeEmbed(fun,prefix),MakeEmbed(music,prefix),MakeEmbed(moderating,prefix),MakeEmbed(debug,prefix)];
response.unshift(firstPage(prefix));
if(!args.length){
    return message.channel.send(response[0]);
}else{
    switch (args[0]) {
        case "general":
            return message.channel.send(response[1]);
        case "fun":
            return message.channel.send(response[2]);
        case "music":
            return message.channel.send(response[3]);
        case "moderating":
            return message.channel.send(response[4]);
        case "config":
            return message.channel.send(response[5]);
        default:
            return message.channel.send(response[0]);

    }
}
//#endregion


}else{
    const data = [];
    const {commands} = message.client;
    //get the command that was mentioned check all the names and aliases
    const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        //if there is no command found return 
if (!command) {
	return message.channel.send(`That was not a valid command!\ntype: ${prefix}help\n for all commands.`);
}

//push values to data array
let embed = new MessageEmbed();
embed.setTitle(`**${command.name}**`)
.setColor('#00ff00');
embed.setDescription("**aliases:**",`${command.aliases}`);
embed.addField("**Description:**",`${command.description}`);
embed.addField("**usage:**",`${prefix}${command.name} ${command.usage}`);
embed.addField("**cooldown:**",`${command.cooldown || 3} second(s)`);
if(args[0] == 'lewd'){
    let ci="";
    let cd="";
    for (let u = 0; u < content.irl.length; u++) {
       ci += ` ${content.irl[u]},`;
    }
    for (let v = 0; v < content.drawn.length; v++) {
       cd += ` ${content.drawn[v]},`;        
    }
    embed.addField("**IRL:**",ci)
    embed.addField("**DRAWN:**",cd);

}
//send
return message.channel.send(embed);

}
	},
    guildprefix(guildID){
        let p = getprefix.GET(guildID);
        if(p){return p}else {return botconfig.prefix}
    }
};
function MakeEmbed(content,prefix){
let embed = new MessageEmbed()
.setAuthor('Little_Korean_Rice_Cooker','https://i.imgur.com/A2SSxSE.png')
.setColor('#00ff00');
content.forEach(item => {
    embed.addField(`${prefix}${item.name} ${item.usage}`,item.description);
});
embed.setFooter(`You can find more info about a command by using: ${prefix}help <command name>`)
return embed;
}
function firstPage(prefix){
        let embed = new MessageEmbed()
        .setAuthor('Little_Korean_Rice_Cooker','https://i.imgur.com/A2SSxSE.png')
        .setColor('#00ff00');
        embed.addField(":bookmark: index",`\`\`\`${prefix}help \`\`\``, inline=true)
        embed.addField(":thinking: general",`\`\`\`${prefix}help general\`\`\``, inline=true)
        embed.addField(":upside_down: fun",`\`\`\`${prefix}help fun\`\`\``, inline=true)
        embed.addField(":notes: music",`\`\`\`${prefix}help music\`\`\``, inline=true)
        embed.addField(":eyes: moderating",`\`\`\`${prefix}help moderating\`\`\``, inline=true)
        embed.addField(":screwdriver: config",`\`\`\`${prefix}help config\`\`\``, inline=true)
        return embed;
}
