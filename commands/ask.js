
var answers = ["It is certain", 
                   "It is decidedly so", 
                   "Without a doubt", 
                   "Yes - definitely",
                   "You may rely on it", 
                   "As I see it, yes", 
                   "Most likely", 
                   "Outlook good", 
                   "Yes", 
                   "Signs point to yes",
                   "Don't count on it", 
                   "My reply is no",
                   "My sources say no", 
                   "Outlook not so good",
                   "Very doubtful", 
                   "Reply hazy, try again", 
                   "Ask again later", 
                   "Better not tell you now",
                   "Cannot predict now", 
                   "Concentrate and ask again",
                   "Pervert"];
module.exports = {
    
	name: 'ask',
    description: 'ask a question',
    usage: '<question>',
    args: 'true',
	execute(message, args) {
         if (args[0] === 'foo') {
            return message.channel.send('bar');
        }
		sent = args.slice(0,args.length).join(' ');
     coin = Math.floor(Math.random() * Math.floor(answers.length));
     console.log(`${sent}\n ${answers[coin]}`)
    return message.channel.send(`${sent}\n ${answers[coin]}`);
	},
};