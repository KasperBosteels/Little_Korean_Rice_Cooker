const {
    ApplicationCommandOptionType,
    ApplicationCommandType,
    ChannelType
  } = require("discord-api-types/v9");
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
        type:1,
        required:false,
        name:"skip",
        channelTypes:[ChannelType.GuildVoice],
        type:ApplicationCommandOptionType.Subcommand,
        description:"Skip the current song."
    },
],
async execute(client,interaction,con){
await interaction.deferReply();
const sub = interaction.options.getSubcommand();
let channel, guildQueue;
guildQueue = client.player.getQueue(interaction.guild.id);
channel = interaction.channel;
let queue = client.player.createQueue(interaction.guild.id, {
    data: { queueInitChannel: channel },
});
await queue.join(channel);
switch (sub) {
    case "play":
        const songName = interaction.options.getString("song"),playlistName = interaction.options.getString("playlist");
        if(songName!==undefined){
              await queue.play(songName,{requestedBy:interaction.user.displayName}).catch((_)=>{if(!guildQueue)queue.stop();})
              await interaction.deferReply({content:"Adding this song to the list."})
        
            
            }else if (playlistName!==undefined){
                const user = await con.manager.findOneBy("Users",{user_id:interaction.user.id})
                const playlist = await con.manager.findBy("Playlists",{name:playlistName,member:user})
                const list = await con.manager.findBy("Songs",{playlist:playlist});            
                list.forEach(async s => {
                    await queue.play(s,{requestedBy:interaction.user.displayName}).catch((_)=>{if(!guildQueue)queue.stop();})
                });
        }else{
            return await interaction.editReply({content:"You need to give me a song or a playlist to play."})
        }
    break;

    case 'remove':

    break;

    default:
        return await interaction.editReply({content:"doing nothing."})
}
}
}