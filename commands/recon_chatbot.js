const score = require('../socalCredit');
const { chatBot } = require("reconlx");
module.exports = {
	name: 'talk',
	description: '*microwave noises*',
	cooldown: 1,
	usage: ' ',
	category: "fun",
	async execute(client,message, args,con) {
		score.ADD(con,1,message.author.id)
        await chatBot(message,args.join(" "));	
},
};