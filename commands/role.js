

        module.exports = {
            name: 'role',
            description: 'gifts a role to a user(non-functional)',
            args:'true',
            usage: '<user> <role>',
            guildOnly:'true',
            execute(message, args) {
                
        //var author = message.author.id;
        //var duckId = 593190985958424586;

        //if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply('perm Denied');
        //normaal is er al een check
        //if (!args[0]) return message.reply('no tag');
        
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply('perm Denied');

        var person = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

        if (!person) return message.reply('unable to find this person');

        //var muteRole = message.guild.roles.cache.get('566308437944958976');//         566308437944958976    meme server        742462154564960440    my dream server
        var role = message.guild.roles.cache.find(role => role.name === 'Muted');
        /*
        if (!role) {//return message.channel.send('no mute role, pls make a role named <Muted>(respect the capital letter!!)');     
        message.guild.roles.create({data:{name: 'Muted', permissions: []}});               
        var role = message.guild.roles.cache.find(role => role.name === 'Muted');
        }
        //var role = message.guild.roles.find(role => role.name === 'Muted');
        */
        if (!role)  return message.channel.send('no mute role, pls make a role named <Muted>(respect the capital letter!!)');
        
        var muteTime = args[1];

        if (!muteTime) return message.channel.send('no time input');

        await(muteperson.roles.add(role.id));
        message.channel.send(`${muteperson} has been muted for ${muteTime}`);
        
      
            },
            
        };