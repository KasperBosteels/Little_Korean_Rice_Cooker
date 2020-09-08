const sweetlove = [
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
'Actually, you can.',
'Yes! Yes! You can do it!',
'Focus on the good.',
'You are doing great.',
'We rise by lifting others.',
'Be happy. Be bright. Be you.',
'Every day is a second chance.',
'You are amazing. Remember that.',
'Darling, you are a work of art.',
'Go!',
'Love.',

'Begin.',

'Let go.',

'Breathe.',

'Slow down.',

'Let it be.',

'Go for it.',

'I love you.',

'Keep going.',

'Choose joy.',

'Enjoy today.',

'C’est la vie.',

'Choose happy.',

'Keep it cool.',

'Take it easy.',

'Be in the now.',

'Live the moment.',

'Choose to shine.',

'No pain, no gain.',

'Do it. With love.',

'Love conquers all.',

'Keep your chin up.',

'Follow your heart.',

'Don’t rush things.',

'You only live once.',

'Never stop dreaming.',

'Now is all you have.',

'Keep moving forward.',

'This too shall pass.',

'Every moment matters.',

'Love more. Worry less.',

'Dust settles. I don’t.',

'Nothing lasts forever.',

'Work hard. Stay humble.',

'Enjoy the little things.',

'The best is yet to come.',

'Better things are coming.',

'Collect moments – not things.',

'Feel the fear and do it anyway.'
];
module.exports = {
    name: 'love',
    description: 'sends a loving message',
    usage: 'empty or <@ user>',
    aliases: ['ily','enc','precious','encourage'],
    cooldown: 1,
    category: "fun",
    execute(client,message, args) {
        coin = Math.floor(Math.random() * Math.floor(sweetlove.length));
        
        
        //if (!message.mentions.users) 
        if (!args[0])
        {
            message.reply(` ${sweetlove[coin]}`);

        }else {

            var member= message.mentions.members.first();
            message.channel.send(`${member}\n${sweetlove[coin]}`)

        }
    },
};