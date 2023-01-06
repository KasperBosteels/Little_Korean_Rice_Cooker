const {
    ApplicationCommandOptionType,
    ApplicationCommandType,
  } = require("discord-api-types/v9");

  module.exports={
    name:"playlist",
    description:"play, edit or create a playlist",
    defaultMemberPermissions:["Speak","JoinVoiceChannel"],
    type:ApplicationCommandType.ChatInput,
    dmPermission:false,
    options:[
        {
            type:ApplicationCommandOptionType.String,
            required:false,
            name:"create",
            description:"Create a new playlist."
        },
        {
            type:ApplicationCommandOptionType.String,
            required:false,
            name:"add",
            description:"Add a new song to your playlist."
        },
        {
            type:ApplicationCommandOptionType.String,
            required:false,
            name:"details",
            description:"Look at the songs in your playlist."
        },
        {
            type:ApplicationCommandOptionType.String,
            required:false,
            name:"delete",
            description:"Delete a playlist."
        },
        {
            type:ApplicationCommandOptionType.SubcommandGroup,
            required:false,
            name:"remove",
            descriptions:"Remove a song from a playlist",
            options:[
                {
                    type:ApplicationCommandOptionType.String,
                    required:true,
                    name:"playlist",
                    description:"Name of the playlist you want to remove from"
                },
                {
                    type:ApplicationCommandOptionType.Integer,
                    require:true,
                    name:"song",
                    description:"Number of the song you want to delete."
                }
            ]
        }
    ]
  }