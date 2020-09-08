const discord = require('discord.js');
const botconfig = require('../auth.json');


module.exports = {

	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: 'optional: [command name]',
    cooldown: 5,
    category: "general",
	execute(client,message, args) {
        if(!args.length){
        var commandlist = [];
        var prefix = botconfig.prefix;
        client.commands.forEach(command =>{
            var constructor = {
                name: command.name,
                description: command.description,
                category: command.category
            }
            commandlist.push(constructor);
        });
        var response = "**BOT COMMANDS**\n\n";
        var general = "**__General__**\n";
        var moderating = "\n**__MODERATING__**\n";
        var fun = "\n**__Fun__**\n";
        var debug ="\n**__Debug__**\n";
for (let i = 0; i < commandlist.length; i++) {
    const command = commandlist[i];
    if(command['category'] == 'general'){
        general += `${prefix}${command['name']} - ${command["description"]}\n`;
    }else if (command['category'] == 'moderating') {
        moderating += `${prefix}${command['name']} - ${command["description"]}\n`;
    }else if (command['category'] == 'debug') {
        debug += `${prefix}${command['name']} - ${command["description"]}\n`;
    }else if (command['category'] == 'fun') {
        fun += `${prefix}${command['name']} - ${command["description"]}\n`;
    }
}
response += general;
response += moderating;
response += debug;
response += fun;
message.author.send(response).then(() =>{message.channel.send(`i\'ve send you a dm with my commands :mailbox_with_mail:\ntip: you can also use ${botconfig.prefix}help <command name>   to get info about a specific command.`);
}).catch(()=>{
    message.channel.send('i could not dm you');
});
}else {
    const data = [];
    const {commands} = message.client;
    const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

if (!command) {
	return message.reply('that was not a valid command!'`\ntype: ${botconfig.prefix}help\n for all commands`);
}

data.push(`**Name:** ${command.name}`);

if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
if (command.description) data.push(`**Description:** ${command.description}`);
if (command.usage) data.push(`**Usage:** ${botconfig.prefix}${command.name} ${command.usage}`);

data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

message.channel.send(data, { split: true });

}
	},
};
