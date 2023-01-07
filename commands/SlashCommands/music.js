const {
    ApplicationCommandOptionType,
    ApplicationCommandType,
  } = require("discord-api-types/v9");
module.exports = {
    name:"music",
    description:"Play music in a voice channel.",
    defaultMemberPermissions:["Speak","JoinVoiceChannel"],
    type:ApplicationCommandType.ChatInput,
    dmPermission:false,
    options:[
    {
        type:ApplicationCommandOptionType.String,
        required:false,
        name:"search",
        description:"Play the audio of a youtube video."
    },
    {
        type:ApplicationCommandOptionType.String,
        required:false,
        name:"playlist",
        description:"Play the songs from one of your playlists."
    },
    {
        type:ApplicationCommandOptionType.Subcommand,
        required:false,
        name:"play/pause",
        description:"resume or pause the current song."
    },
    {
        type:ApplicationCommandOptionType.Subcommand,
        required:false,
        name:"remove",
        description:"Remove the current song from the queue."
    },
    {
        type:ApplicationCommandOptionType.SubcommandGroup,
        required:false,
        name:"queue",
        description:"Create a loop from the current songs in the queue.",
        options:[
            {
                type:ApplicationCommandOptionType.Subcommand,
                required:false,
                name:"stop",
                description:"Stop looping.",
            },
            {
                type:ApplicationCommandOptionType.Subcommand,
                required:false,
                name:"song",
                description:"Loop the current song.",
            },
            {
                type:ApplicationCommandOptionType.Subcommand,
                required:false,
                name:"queue",
                description:"Loop the entire queue."
            }
        ],
    },
    {
        type:ApplicationCommandOptionType.Subcommand,
        required:false,
        name:"skip",
        description:"Skip the current song."
    },
    {
        type:ApplicationCommandOptionType.Integer,
        required:false,
        name:"volume",
        description:"Change the Volume of the player."
    },
    {
        type:ApplicationCommandOptionType.Subcommand,
        required:false,
        name:"stop",
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