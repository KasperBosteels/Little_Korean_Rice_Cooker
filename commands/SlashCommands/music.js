const {
    ApplicationCommandOptionType,
    ApplicationCommandType,
    ChannelType
  } = require("discord-api-types/v9");
const G = require("../../Generators/GenerateSimpleEmbed").GenerateEmbed;
module.exports = {
    name:"music",
    description:"Play music in a voice channel.",
    defaultMemberPermissions: ["SendMessages", "ViewChannel"],
    type:ApplicationCommandType.ChatInput,
    dmPermission:false,
    options:[
        {
        type:ApplicationCommandOptionType.Subcommand,
        required:false,
        name:"play",
        channelTypes:[ChannelType.GuildVoice],
        description:"Play a song from youtube.",
        options:[
            {
                type:ApplicationCommandOptionType.String,
                required:false,
                name:"song",
                description:"Name or url of the song.",
            },
            {
                type:ApplicationCommandOptionType.String,
                required:false,
                name:"playlist",
                description:"Name of the playlist you want to play."
            }
        ]
    },
    {
        type:ApplicationCommandOptionType.Subcommand,
        required:false,
        name:"remove",
        channelTypes:[ChannelType.GuildVoice],

        description:"Remove a song from the queue.",
        options:[
            {
                type:ApplicationCommandOptionType.Number,
                name:"song",
                description:"Remove a song from the queue",
                required:true,
            }
        ]
    },
    {
        type:ApplicationCommandOptionType.Subcommand,
        required:false,
        name:"loop",
        channelTypes:[ChannelType.GuildVoice],
        description:"Create a loop from the current songs in the queue.",
        options:[
            {
                type:ApplicationCommandOptionType.String,
                name:"looping",
                required:true,
                description:"Loop action.",
                choices:[
                    {
                        name:"stop",
                        value:"stop"
                    },{
                        name:"song",
                        value:"song"
                    },{
                        name:"all",
                        value:"all"
                    }]
            }
        ]
    },
    {
        required:false,
        name:"skip",
        channelTypes:[ChannelType.GuildVoice],
        type:ApplicationCommandOptionType.Subcommand,
        description:"Skip the current song."
    },
    {
        required:false,
        name:"queue",
        channelTypes:[ChannelType.GuildVoice],
        type:ApplicationCommandOptionType.Subcommand,
        description:"See all the songs for the current queue."
    },
],
async execute(client,interaction,con){
await interaction.deferReply();
const sub = interaction.options.getSubcommand();
let channel;
channel = interaction.guild.members.cache.get(interaction.member.user.id).voice.channel;
let queue = client.player.createQueue(interaction.guild.id, {
    data: { queueInitChannel: channel },
});
try{
    await queue.join(channel)
}catch(error){
    console.log(error)
}
switch (sub) {
    case "play":
        const songName = interaction.options.getString("song"),playlistName = interaction.options.getString("playlist");
        if(songName!==null){
            console.log(songName);
            try
            {
            await queue.play(songName,{requestedBy:interaction.user})
            }
            catch(error){
                console.log(error)
                return await interaction.editReply({content:"Unable to play this song: "+songName})
            }
            console.log("playing song")
            return await interaction.editReply({content:"Song added"})
            
            }else if (playlistName!==null){
                const user = await con.manager.findOneBy("Users",{user_id:interaction.user.id})
                const playlist = await con.manager.findBy("Playlists",{playlist_name:playlistName,member:user})
                const list = await con.manager.findBy("Songs",{playlist:playlist});
                try{
                await Promise.all(list.forEach(async s => {
                    try{
                    await queue.play(s.song_url,{requestedBy:interaction.user});
                    }catch(e){
                        console.log(e);
                        interaction.channel.send({content:"Unable to play this song: "+s.song_url})
                    }
                }));
                return await interaction.followUp({content:"Added all the songs from "+playlist.playlist_name});
            }catch(error){
                console.log(error)
            }   
        }else{
            return await interaction.followUp({content:"You need to give me a song or a playlist to play."})
        }
    break;

    case 'remove':
        const toSkip = interaction.options.getNumber("song")
        if(isNaN(toSkip))return await interaction.followUp({content:"You need to give the index of the number."})
        if(toSkip!==null){
            try{
            await queue.remove(toSkip)
            return interaction.followUp({content:"removing..."})
            }catch(error){
                console.log(error);
            }
        }
    break;

    case 'loop':
        const loopOption = interaction.options.getString("looping");
        if(loopOption===null || loopOption === "stop"){
            await queue.setRepeatMode(0);
            return await interaction.followUp({content:"Stopped looping"});
        }else if(loopOption === 'song' ){
            await queue.setRepeatMode(1);
            return await interaction.followUp({content:"Looping this song."});
        }else{
            //else if loopOption === 'all'
            await queue.setRepeatMode(2);
            return await interaction.followUp({content:"Looping trough all songs"});
        }
    case'skip':
        try{
            await queue.skip()
            return await interaction.followUp({content:"skipping current song..."})
        }catch(error){
            console.log(error)
        }
    break;

    case"queue":
    const allSongs = queue.songs, songFields =[];
    try{
        await Promise.all(allSongs.map((s,i) => {
            const v= `\`\`\`author: ${s.author}\nduration: ${s.duration}\nrequested by: ${s.requestedBy.username}\`\`\``
            const n = s.isFirst?"Playing: "+s.name :`${i}. `+s.name;
            songFields.push({name:n ,value:v})
        }));
        return await interaction.followUp({embeds:[G('Random',"Songs currently in queue.",false,songFields,false,false,"Queue")]})
    }catch(error){
        console.log(error)
    }
    break;
    default:
        return await interaction.followUp({content:"doing nothing."})
    }
}
}