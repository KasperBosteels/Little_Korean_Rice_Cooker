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
message.author.send(response).then(() =>{message.channel.send('i\'ve send you a dm with my commands :mailbox_with_mail:');
}).catch(()=>{
    message.channel.send('i could not dm you')
})

        //#region old version
        /*const data = [];
        const { commands } = message.client;

    if (!args.length) {
        
        data.push('Here\'s a list of all my commands:');
        data.push(commands.map(command => command.name).join(', '));
        data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);
        return message.author.send(data, { split: true })
            .then(() => {
                if (message.channel.type === 'dm') return;
                message.reply('I\'ve sent you a DM with all my commands!');
                console.log(`${prefix}help           ${message.author.tag}           dm`);

            })
            .catch(error => {
                console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
            });
    } else {
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

if (!command) {
	return message.reply('that was not a valid command!'`\ntype: ${prefix}help\n for all commands`);
}

data.push(`**Name:** ${command.name}`);

if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
if (command.description) data.push(`**Description:** ${command.description}`);
if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

message.channel.send(data, { split: true });

    }
    process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));
   

*/
//#endregion
	},
};
