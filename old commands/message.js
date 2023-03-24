const { MessageButton, MessageActionRow} = require('discord.js');
const discord = require('discord.js');
module.exports = {
	name: 'message',
	description: 'Message the author of the bot. __abuse will result in removal of acces to commands__',
	cooldown: 10,
	usage: '<you message>',
    category: "general",
    args: 'true',
	async execute(client,message,args,con,options,button) {
        let mail =message.content;
        let user = message.author;
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId('send')
            .setLabel('send')
            .setStyle('SUCCESS'),
            new MessageButton()
            .setLabel('discard')
            .setCustomId('discard')
            .setStyle('DANGER'),
        );
        
        let embed = new discord.MessageEmbed()
        .setColor('#008000')
        .setTitle(':postbox: Are you sure you want so send this message?')
        .setDescription(mail);
        await message.channel.send({content:"ㅤ",ephemeral:true,embeds:[embed],components:[row]});
        client.on('interactionCreate',async interaction =>{
            if(!interaction.isButton())return;
            console.log(interaction);
            if(interaction.id === 'send'){
                console.log('sending email')
                let response = await send_Mail(mail,message,client,con);
                await button.reply.update({content:response});
            }else if (interaction.id === 'discard_email'){
                console.log('discarding email')
                await interaction.reply.update('...discarding email.');
            }else{
                return;
            }
        })
	},
};
function send_Mail(mail,message,client,con){
    let mem = message.member
    try{
        client.users.fetch("258217948819357697").then((user) => {
            user.send({content:`user: ${mem.nickname}\n\`\`\`id: ${mem.id}\nguild: ${message.guild.name}\nchannel: ${message.channel.name}\nmessage: ${mail}\`\`\``});
        });
        con.query(`INSERT INTO user_messages (userID,userName,guildID,channelID,guildName,channelName,message) VALUES ("${mem.id}","${mem.username}","${message.guild.id}","${message.channel.id}","${message.guild.name}","${message.channel.name}","${mail}");`)
    }catch(error) {
        console.error(error);
        return 'For some reason the author was not able to receive the message.';

    }
    return `Your message was received, Have a nice day. :mailbox_with_mail:`

}