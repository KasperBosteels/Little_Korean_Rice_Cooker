const {
    ApplicationCommandOptionType,
    ApplicationCommandType,
  } = require("discord-api-types/v9");
const { execute } = require("../GoogleV2");

  module.exports={
    name:"playlist",
    description:"Play, edit or create a playlist",
    defaultMemberPermissions: ["SendMessages", "ViewChannel"],
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
            type:ApplicationCommandOptionType.Subcommand,
            required:false,
            name:"remove",
            description:"Remove a song from a playlist",
            options:[
            {
                type:ApplicationCommandOptionType.String,
                name:"list",
                description:"Name of the playlist.",
                required:true
            },
            {
                type:ApplicationCommandOptionType.Number,
                name:"song",
                description:"Number of the song you want to remove.",
                required:true
            }
        ]  

        }
    ],
    async execute(client,interaction,con){

    }
  }