module.exports = {
	name: 'message',
	description: 'message the author of the bot',
	cooldown: 10,
	usage: '<you message>',
    category: "general",
    args: 'true',
	execute(client,message, args) {
        //258217948819357697
        let mail =message.content;
        try{
            client.users.fetch("258217948819357697").then((user) => {
                user.send(`${message.author}-/-${message.author.id} =>${message.author} =>${message.guild.name}  =>  =>${mail}`);
                message.channel.send(`Your message was received,\nHave a nice day.`)
            });
        }catch(error) {
            console.error(error);
            message.reply('for some reason the author was not able to receive the message');
        }
		

	},
};