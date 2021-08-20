const { MessageButton, MessageActionRow} = require('discord-buttons');
const discord = require('discord.js');
module.exports = {
	name: 'message',
	description: 'Message the author of the bot. __abuse will result in removal of acces to commands__',
	cooldown: 10,
	usage: '<you message>',
    category: "general",
    args: 'true',
	async execute(client,message,args,con,options,button) {
        //258217948819357697
        let mail =message.content;
        let user = message.author;
        var button1 = new MessageButton()
        .setStyle('green')
        .setLabel('send')
        .setID('send');
        var button2 = new MessageButton()
        .setStyle('red')
        .setLabel('discard')
        .setID('discard_email')
        var row = new MessageActionRow()
        .addComponents(button1,button2);
        let embed = new discord.MessageEmbed()
        .setColor('#008000')
        .setTitle(':postbox: Are you sure you want so send this message?')
        .setDescription(mail);
        message.channel.send(embed,row);
        client.on('clickButton', async (button)=>{
            if(button.id === 'send'){
                let response = await send_Mail(mail,message,client,con);
                await button.reply.send(response);
            }else if (button.id === 'discard_email'){
                await button.reply.send('...discarding email.');
            }else{
                return;
            }
        })
      
		

	},
};
function send_Mail(mail,message,client,con){
    try{
        client.users.fetch("258217948819357697").then((user) => {
            user.send(`user: ${message.author.username}\n\`\`\`id: ${message.author.id}\nguild: ${message.guild.name}\nchannel: ${message.channel.name}\nmessage: ${mail}\`\`\``);
        });
        con.query(`INSERT INTO user_messages (userID,userName,guildID,channelID,guildName,channelName,message) VALUES ("${message.author.id}","${message.author.username}","${message.guild.id}","${message.channel.id}","${message.guild.name}","${message.channel.name}","${mail}");`)
    }catch(error) {
        console.error(error);
        return 'For some reason the author was not able to receive the message.';

    }
    return `Your message was received, Have a nice day. :mailbox_with_mail:`

}