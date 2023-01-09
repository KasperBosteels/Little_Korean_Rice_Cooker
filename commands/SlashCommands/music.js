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
        type:ApplicationCommandOptionType.String,
        required:false,
        name:"search",
        channelTypes:[ChannelType.GuildVoice],

        description:"Play the audio of a youtube video.",
        channelTypes:[ChannelType.GuildVoice],

    },
    {
        type:ApplicationCommandOptionType.String,
        required:false,
        name:"playlist",
        channelTypes:[ChannelType.GuildVoice],

        description:"Play the songs from one of your playlists."
    },
    {
        type:ApplicationCommandOptionType.Subcommand,
        required:false,
        name:"play-pause",
        channelTypes:[ChannelType.GuildVoice],

        description:"resume or pause the current song."
    },
    {
        type:ApplicationCommandOptionType.Subcommand,
        required:false,
        name:"remove",
        channelTypes:[ChannelType.GuildVoice],

        description:"Remove the current song from the queue."
    },
    {
        type:ApplicationCommandOptionType.SubcommandGroup,
        required:false,
        name:"queue",
        channelTypes:[ChannelType.GuildVoice],
        description:"Create a loop from the current songs in the queue.",
        options:[
            {
                type:1,
                required:false,
                name:"stop",
                description:"Stop looping.",
            },
            {
                type:1,
                required:false,
                name:"song",
                description:"Loop the current song.",
            },
            {
                type:1,
                required:false,
                name:"list",
                description:"Loop the entire queue."
            }
        ],
    },
    {
        type:1,
        required:false,
        name:"skip",
        channelTypes:[ChannelType.GuildVoice],

        description:"Skip the current song."
    },
    {
        type:ApplicationCommandOptionType.Integer,
        required:false,
        name:"volume",
        channelTypes:[ChannelType.GuildVoice],

        description:"Change the Volume of the player."
    },
    {
        type:1,
        required:false,
        name:"stop",
        channelTypes:[ChannelType.GuildVoice],

        description:"Stop the player."
    }
],
async execute(client,interaction,con){
const search = interaction.options.getString("search");
const playlist = interaction.options.getString("playlist");
const sub = interaction.options.getSubCommand();
if(search)return //search stuff
if(playlist)return //playlist stuff
switch (sub) {
    case value:
        
        break;

    default:
        break;
}
}
}