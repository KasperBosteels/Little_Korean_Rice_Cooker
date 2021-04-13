const botconfig = require('../auth.json');
const content = require('../jsonFiles/swearwords.json');
const getprefix = require('../getprefixData.js');
const {MessageEmbed} = require('discord.js');
const recon = require('reconlx');
const ReactionPages = recon.ReactionPages;
module.exports = {

	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: 'optional: [command name]',
    cooldown: 5,
    category: "general",
	execute(client,message, args) {
        //checks if a speciic command query was asked if not send dm withh all commmands
        if(!args.length){
        var commandlist = [];
        var prefix = this.guildprefix(message.guild.id);
        
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
var response = [MakeEmbed(general),MakeEmbed(fun),MakeEmbed(music),MakeEmbed(moderating),MakeEmbed(debug)];
//dm the response string to the author if not possible send declined in channel
ReactionPages(message,response,true,["⏪", "⏩"],120000);



//if specific command was asked
}else {
    const data = [];
    const {commands} = message.client;
    //get the command that was mentioned check all the names and aliases
    const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        //if there is no command found return 
if (!command) {
	return message.reply('That was not a valid command!'`\ntype: ${prefix}help\n for all commands.`);
}

//push values to data array
data.push(`**Name:** ${command.name}`);

//markup of message
if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
if (command.description) data.push(`**Description:** ${command.description}`);
if (command.usage) data.push(`**Usage:** ${botconfig.prefix}${command.name} ${command.usage}`);
data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);
if(args[0] == 'lewd'){
    let ci="**IRL**";
    let cd="**DRAWN**";
    for (let u = 0; u < content.irl.length; u++) {
       ci += ` ${content.irl[u]},`;
    }
    for (let v = 0; v < content.drawn.length; v++) {
       cd += ` ${content.drawn[v]},`;        
    }
    data.push(`${ci}\n${cd}`);
}
//send
message.channel.send(data, { split: true });

}
	},
    guildprefix(guildID){
        let p = getprefix.GET(guildID);
        if(p){return p}else {return botconfig.prefix}
    }
};
function MakeEmbed(content,usage){
let embed = new MessageEmbed()
.setAuthor('Little_Korean_Rice_Cooker','https://i.imgur.com/A2SSxSE.png')
.setColor('#00ff00');
content.forEach(item => {
    embed.addField(`${botconfig.prefix}${item.name} ${item.usage}`,item.description);
});
return embed;
}
