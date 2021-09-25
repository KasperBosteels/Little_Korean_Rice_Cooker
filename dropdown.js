const { MessageSelectMenu } = require('discord.js');
const {discord,MessageActionRow,MessageSelectionMenu, Message} = require('discord.js');
const {MessageEmbed} = require("discord.js");
module.exports ={
    async execute(client,message,embeds){
const riws = new MessageActionRow()
.addComponents(
    new MessageSelectMenu()
.setCustomId('select')
.setPlaceholder('Select help topic')
.addOptions([
    {
        label:'general',
        description:'index of the menu',
        value:"general"
    },{
        label:'fun',
        description:'index of the menu',
        value:'fun'
    },{
        label:'music',
        description:'index of the menu',
        value:'music'
    },{
        label:'moderating',
        description:'index of the menu',
        value:'moderating'
    },{
        label:'config',
        description:'index of the menu',
        value:'config'
    }
    
    ])
)
let sendmsg = await message.channel.send({content: "ㅤ",ephemeral:true,embeds:[embeds[0]],components:[riws]})
const collector= message.channel.createMessageComponentCollector({
    cmoponentType:"SELECT_MENU"
})
collector.on('collect',async(collected)=>{
const value = collected.values[0];
switch (value) {
    case "general":
        await collected.update({embeds:[embeds[1]],ephemeral:true})
        break;
    case "fun":
        await collected.update({embeds:[embeds[2]],ephemeral:true})
        break;
    case "music":
        await collected.update({embeds:[embeds[3]],ephemeral:true})
        break;
    case "moderating":
        await collected.update({embeds:[embeds[4]],ephemeral:true})
        break;
    case "config":
        await collected.update({embeds:[embeds[5]],ephemeral:true})
        break;
    default:
        await collected.update({embeds:[embeds[0]],ephemeral:true})
        break;
    }

    });
}
}