const answer = [
'You can totally do this.',
'Impossible is for the unwilling.',
'No pressure, no diamonds.',
'Stay foolish to stay sane.',
'When nothing goes right, go left.',
'Prove them wrong.',
'Good things happen to those who hustle.',
'He who is brave is free.',
'Solitary trees, if they grow at all, grow strong.',
'Keep going. Be all in.',
'Leave no stone unturned.',
'Broken crayons still color.',
'You can if you think you can.',
'Whatever you are, be a good one.',
'The past does not equal the future.',
'Dream without fear. Love without limits.',
'You are loved.',
'Focus on the good.',
'You are doing great.',
'We rise by lifting others.',
'Be happy. Be bright. Be you.',
'Every day is a second chance.',
'You are amazing. Remember that.',
'Darling, you are a work of art.',
'Love.',
'Breathe.',
'Slow down.',
'Let it be.',
'I love you.',
'Keep going.',
'Choose joy.',
'Enjoy today.',
'C’est la vie.',
'Choose happy.',
'Keep it cool.',
'Take it easy.',
'Live the moment.',
'Choose to shine.',
'Love conquers all.',
'Keep your chin up.',
'Follow your heart.',
'Don’t rush things.',
'You only live once.',
'Never stop dreaming.',
'Love more. Worry less.',
'Enjoy the little things.',
'What people want is very simple - they want you.',
'I would give up communism for you.',
'\"Sorry i woke up a 7 im tired\" - wizard of lose',
'Do not let the behavior of others destroy your inner peace.',
'Nobody can bring you peace but yourself.',
'When the power of love overcomes the love of power the world will know peace.',
'When you make peace with yourself, you make peace with the world.',
'When the light is gone you will find a way to make it again, you will find your sun in the cold night',
'You find peace not by rearranging the circumstances of your life, but by realizing who you are at the deepest level',
'Peace is a daily, a weekly, a monthly process, gradually changing opinions, slowly eroding old barriers, quietly building new structures',
'If there’s no inner peace, people can’t give it to you. The husband can’t give it to you. Your children can’t give it to you. You have to give it to you',
'It isn’t enough to talk about peace. One must believe in it. And it isn’t enough to believe in it. One must work at it',
'When the soul lies down in that grass the world is too full to talk about.',
'Keep your best wishes, close to your heart and watch what happens',
'Letting go gives us freedom, and freedom is the only condition for happiness',
'The life of inner peace, being harmonious and without stress, is the easiest type of existence',
'Never be in a hurry; do everything quietly and in a calm spirit. Do not lose your inner peace for anything whatsoever, even if your whole world seems upset Peace is always beautiful',
'When things change inside you, things change around you',
'“Every breath we take, every step we make, can be filled with peace, joy and serenity.”',
'Pack your weaponry you and me are going to free Jerusalem.',
'What...why am i desperatly sucking your pp like this...?',
'Huh huh whuh - dani',
'I\'m going to become lewd for you.',
'Please eat me.',
'Rather than cumming on my clarinet, let\'s hold hands.',
'If you want to suck on a cigarette, then suck on mine.',
'Fighting for peace is like screwing for virginity',
'It was almost too big, too thick, too long to be a penis but it was yours',
'The penis i grew is my true feelings',
'You have nice boobies i don\t need any more reason to love you.',
'I would love to give you the gay.',
'*gives spicy italian cream*',
'Sperm people living in your balls are saying they want to form an alliance with my ovaries.',
'All we\'ve gotta do is stop being normal',
'Im ejaculating from my heart for you.',
'Your the first person i found that loves me destroying their balls.',
'Showing of our erect nipples is how we would date.',
'Thank you for being here with me.',
'Love is simply mutual perverted deeds.',
'**pats you**',
'Every boy in the world becomes the fucking flash when their parents almost walk in on them jerking off.',
'In a sexual way',
'My lower body feels somewhat refreshed',
'i am ready for a snack (its you)',


];
module.exports = {
    name: 'love',
    description: 'sends a loving message',
    usage: 'empty or <@ user>',
    aliases: ['ily'],
    cooldown: 1,
    category: "fun",
    async execute(client,message, args) {
        coin = Math.floor(Math.random() * Math.floor(answer.length));
        var manualinput = " ";

        
        //looks for given arguments
        if (!args[0])
        {
            //no arguments reply command
            return message.reply(` ${answer[coin]}`);

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
                return message.channel.send(`${manualinput}\n${answer[coin]}`);
            }else{
                //return member and text
                return message.channel.send(`${member}\n${answer[coin]}`);
            }
        }
    },
};