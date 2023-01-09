const {
    ApplicationCommandOptionType,
    ApplicationCommandType,
  } = require("discord-api-types/v9");
const { NewsChannel } = require("discord.js");

  module.exports={
    name:"playlist",
    description:"play, edit or create a playlist",
    defaultMemberPermissions: ["SendMessages", "ViewChannel"],
    type:ApplicationCommandType.ChatInput,
    dmPermission:false,
    options:[
        {
            type:ApplicationCommandOptionType.Subcommand,
            required:false,
            name:"create",
            description:"Create a new playlist.",
            options:[
                {

                    type:ApplicationCommandOptionType.String,
                    required:true,
                    name:"name",
                    description:"Name of the new Playlist."
                }
        ]
        },
        {
            type:ApplicationCommandOptionType.Subcommand,
            required:false,
            name:"add",
            description:"Add a new song to your playlist.",
            options:[
            {
                type:ApplicationCommandOptionType.String,
                name:"playlist",
                required:true,
                description:"Name of the playlist you want to add a song to.",
            },
            {
                type:ApplicationCommandOptionType.String,
                name:"url",
                required:true,
                description:"Url of the song you want to add."
            }
        ]
        },
        {
            type:ApplicationCommandOptionType.Subcommand,
            name:"delete",
            description:"Delete a playlist.",
            options:[
                {
                    type:ApplicationCommandOptionType.String,
                    name:"name",
                    required:true,
                    description:"Name of the playlist you want to delete."
                }]
        },
        {
            type:ApplicationCommandOptionType.Subcommand,
            required:false,
            name:"remove",
            description:"Remove a song from a playlist",
            options:[
                {
                    type:ApplicationCommandOptionType.String,
                    name:"playlist",
                    required:true,

                    description:"Name of the playlist you want to remove from"
                },
                {
                    type:ApplicationCommandOptionType.Number,
                    name:"song",
                    required:true,

                    description:"Number of the song you want to delete."
                }
            ]
        }
    ],
    async execute(client,interaction,con){
        await interaction.deferReply();
        const user = await con.manager.findOneBy("Users",{user_id:interaction.user.id})
        const playrepository = await con.manager.getRepository("Playlists");
        const songrepository = await con.manager.getRepository("Songs");
        let sub = interaction.options.getSubcommand();
        if(sub ==="create"){
            const playname = interaction.options.getString("name")
            const user = await con.manager.findOneBy("Users",{user_id:interaction.user.id});
            const newPlaylist = playrepository.create({
                playlist_name:playname,
                member:user
            });
            await playrepository.save(newPlaylist)
            return interaction.editReply({content:`Playlist '${playname}' created.`,ephermeral:true})
        }else if (sub === "add"){
            const list = interaction.options.getString("playlist");
            const song = interaction.options.getString("url");
            const playlist = await con.manager.findOneBy("Playlists",{member:user,playlist_name:list})
            if(!playlist)return await interaction.editReply({content:"This playlist was not found."})
            console.log(playlist)
            const newSong = songrepository.create({
                song_url:song,
                playlist:playlist
            });
            try{
            await songrepository.save(newSong)
            return await interaction.editReply({content:`Added this song to ${playlist.playlist_name}`});
        }catch(error){
            return await interaction.editReply({content:"Unable to add songs to playlists at the moment."})
        }
        }else if (sub ==="delete"){
            const name = interaction.options.getString("name");
            try{
            await con.manager.delete("Playlist",{member:user,playlist_name:name});
            return await interaction.editReply({content:`Removed ${name} from you playlists`});
        }catch(error){
            console.log(error);
            return await interaction.editReply({content:"Unable to delete this playlist"});
            }
        }else if (sub ==="remove"){

            const playlist =con.manager.findOneBy("Playlists",{playlist_name: interaction.options.getString("playlist"),member:user});
            const index = interaction.options.getNumber("song");
            try{
               const songs =  await con.manager.findBy("Songs",{playlist:playlist});
                const song = songs[index-1];
                await songrepository.delete(song);
                return await interaction.editReply({content:"Removed that song for you."})
            }catch(error){
                return await interaction.editReply({content:"Unable to remove songs at this moment."})
            }
        }else {
            await interaction.reply({content:"appears when nothing is input"})
        }
    }
  }