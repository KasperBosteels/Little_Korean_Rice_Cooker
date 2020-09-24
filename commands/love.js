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

            //if variable == undefined 
            if(!member){
                console.log(args);

                //assign args array to string
                for (let i = 0; i < args.length; i++) {
                    if(args[i] == undefined){}else{
                    manualinput += ` ${args[i]}`;
                    console.log(manualinput);
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