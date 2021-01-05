const botconfig = require('../auth.json');
const content = require('../jsonFiles/swearwords.json');
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
        var prefix = botconfig.prefix;
        
        //for each command in commands folder get name description and category
        client.commands.forEach(command =>{
            var constructor = {
                name: command.name,
                description: command.description,
                category: command.category
            }
            //assign values to command list array 
            commandlist.push(constructor);
        });
        //default markup
        var response = "**BOT COMMANDS**\n\n";
        var general = "**__General__**\n";
        var moderating = "\n**__MODERATING__**\n";
        var fun = "\n**__Fun__**\n";
        var debug ="\n**__Debug__**\n";
        var currency="\n**__currency__**\n";
        //for the every command in the commandlist add values to a string from its category
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
    }else if(command['category'] == 'currency'){
        currency += `${prefix}${command['name']} - ${command['description']}\n`;
    }
}
//put all category strings in response string
response += general;
response += moderating;
response += debug;
response += fun;
response += currency;
//dm the response string to the author if not possible send declined in channel
message.author.send(response).then(() =>{message.channel.send(`i\'ve send you a dm with my commands :mailbox_with_mail:\ntip: you can also use ${botconfig.prefix}help <command name>   to get info about a specific command.`);
}).catch((err)=>{
    console.log(err);
    message.channel.send('i could not dm you');
});



//if specific command was asked
}else {
    const data = [];
    const {commands} = message.client;
    //get the command that was mentioned check all the names and aliases
    const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        //if there is no command found return 
if (!command) {
	return message.reply('that was not a valid command!'`\ntype: ${botconfig.prefix}help\n for all commands`);
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
};
