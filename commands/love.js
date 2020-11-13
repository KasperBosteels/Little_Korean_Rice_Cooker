const love = require("../love.json");

module.exports = {
    name: 'love',
    description: 'sends a loving message',
    usage: 'empty or <@ user>',
    aliases: ['ily'],
    cooldown: 1,
    category: "fun",
    async execute(client,message, args) {
        coin = Math.floor(Math.random() * Math.floor(love.answer.length));
        var manualinput = " ";

        
        //looks for given arguments
        if (!args[0])
        {
            //no arguments reply command
            return message.reply(` ${love.answer[coin]}`);

        }else {
            //argument given, assign mention to variable
            var member= message.mentions.members.first();
            if (member.id == "397286381883359232" && message.author.id == "258217948819357697"){
            return message.channel.send(`${member}\nhttps://tenor.com/biAHU.gif`);
            }
            //if variable == undefined 
            if(!member){
                

                //assign args array to string
                for (let i = 0; i < args.length; i++) {
                    if(args[i] == undefined){}else{
                    manualinput += ` ${args[i]}`;
                   
                }}
                //return string with text
                return message.channel.send(`${manualinput}\n${love.answer[coin]}`);
            }else{
                //return member and text
                return message.channel.send(`${member}\n${love.answer[coin]}`);
            }
        }
    },
};