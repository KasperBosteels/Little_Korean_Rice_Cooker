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
            type:ApplicationCommandOptionType.SubcommandGroup,
            required:false,
            name:"add",
            description:"Add a new song to your playlist.",
            options:[
            {
                type:ApplicationCommandOptionType.String,
                required:true,
                name:"playlist",
                description:"Name of the playlist you want to add a song to.",
            },
            {
                type:ApplicationCommandOptionType.String,
                required:true,
                name:"url",
                description:"Url of the song you want to add."
            }
        ]
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
            description:"Remove a song from a playlist",
            options:[
                {
                    type:ApplicationCommandOptionType.String,
                    required:true,
                    name:"playlist",
                    description:"Name of the playlist you want to remove from"
                },
                {
                    type:ApplicationCommandOptionType.Integer,
                    required:true,
                    name:"song",
                    description:"Number of the song you want to delete."
                }
            ]
        }
    ],
    async execute(client,interaction,con){
        await interaction.deferReply();
        let response;
        let create = interaction.options.getString("create"),
        add=interaction.options.getSubCommand("add"),
        details = interaction.options.getString("details"),
        delete_playlist = interaction.options.getString("delete"),
        remove = interaction.options.getSubCommand("remove");
        if(create){
            await con.manager.insert("Playlists",{playlist_name:create})
            return interaction.reply({content:"playlist created",ephermeral:true})
        }else if (add){
            const list = interaction.options.getString("playlist");
            const song = interaction.options.getString("url");
            const playlist = await con.manager.findOneBy("Playslists",{user:interaction.user.id,playlist_name:list})
            if(playlist){
                await con.manager.insert("Song",{playlist:playlist_id,song_url:song})
            }
        }else if (details){
            const playlist = await con.manager.findOneBy("Playlist",{user:interaction.user.id,playlist_name:details});
            const songs = await con.manager.findBy("Song",{playlist:playlist.playlist_id})
        }else if (delete_playlist){
            await con.manager.delete("Playlist", {playlist_name:delete_playlist})
        }else if (remove){
            const playlistName = interaction.options.getString("playlist")
            const song = interaction.options.getInterger("song")
            await con.manager.findOneBy("Playlist",{playlist_name:playlistName,user:interaction.user.id}).then(async(p)=>{
                await con.manager.delete("Song",{playlist:p.playlist_id,song_url:song});
            });
        }else {
            
        }
    }
  }