const {
    ApplicationCommandOptionType,
    ApplicationCommandType,
  } = require("discord-api-types/v9");
const yts = require("yt-search");
const G = require("../../Generators/GenerateSimpleEmbed").GenerateEmbed;
  
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
            name:"all",
            description:"See all your playlists.",
        },
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
            required:false,
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
        },{
            type:ApplicationCommandOptionType.Subcommand,
            required:false,
            name:"details",
            description:"See all songs, and other information about a playlist.",
            options:[
                {
                    type:ApplicationCommandOptionType.String,
                    name:"playlist",
                    required:true,
                    description:"Name of the playlist you want to learn more about."
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
           try{
            const newPlaylist = playrepository.create({
                playlist_name:playname,
                member:user
            });
            await playrepository.save(newPlaylist)
            const embed = G("Random","Your new playlist has been created.",false,false,true,false,"created "+playname)
            return interaction.editReply({embeds:[embed]})
            }catch(error){
                console.error(error)
            }
        }else if (sub === "add"){
            const list = interaction.options.getString("playlist");
            const song = interaction.options.getString("url");
            const playlist = await con.manager.findOneBy("Playlists",{member:user,playlist_name:list})
            if(!playlist)return await interaction.editReply({content:"This playlist was not found."})
            let songurl,songTitle,thumbnail,duration,author,authorurl,newSong,youtubeResult;
            try{
                await yts.search(song).then((r)=>
                {
                    youtubeResult=r.all[0];
                    songurl= youtubeResult.url
                    songTitle=youtubeResult.title
                    thumbnail=youtubeResult.thumbnail
                    duration=youtubeResult.duration.toString()
                    author=youtubeResult.author.name
                    authorurl=youtubeResult.author.url

                    newSong = songrepository.create({
                    song_url:song,
                    song_title:songTitle,
                    playlist:playlist,
                    song_thumbnail:thumbnail,
                    song_duration:duration,
                    song_author:author,
                    song_author_url:authorurl
                    });
                });
                await songrepository.save(newSong)
            }catch(error){
                console.log(error)
                return await interaction.editReply({content:"Could not find that song on youtube."})
            }finally{
        }
            try{

            return await interaction.editReply({embeds:[G("#00801f",`Added ${song} to ${playlist.playlist_name}`,false,false,true,false,"Added song to your playlist.")]});
        }catch(error){
            return await interaction.editReply({embeds:[G("#00804f",`Adding ${song} to ${list} Failed`,false,false,true,false,"Adding song to your playlist.")]})
        }
        }else if (sub ==="delete"){
            const name = interaction.options.getString("name");
            try{
            await con.manager.delete("Playlist",{member:user,playlist_name:name});
            return await interaction.editReply({embeds:[G("#00805f",`Deleting ${name} was successfull`,false,false,true,false,"Deleting a playlist.")]});
        }catch(error){
            console.log(error);
            return await interaction.editReply({embeds:[G("#008f8f",`Deleting ${name} has failed`,false,false,true,false,"Deleting a playlist.")]});
            }
        }else if (sub ==="remove"){

            const playlist =con.manager.findOneBy("Playlists",{playlist_name: interaction.options.getString("playlist"),member:user});
            const index = interaction.options.getNumber("song");
            try{
               const songs =  await con.manager.findBy("Songs",{playlist:playlist});
                const song = songs[index-1];
                await songrepository.delete(song);
                return await interaction.editReply({embeds:[G("#0a804f",`Removing a song from ${playlist.playlist_name} was successfull`,false,false,true,false,"Removing a song from a playlist.")]})
            }catch(error){
                return await interaction.editReply({embeds:[G("#00600f",`Removing a song from ${playlist.playlist_name} has failed`,false,false,true,false,"Removing a song from a playlist.")]})
            }
        }else if (sub === "details"){
            const playlistName = interaction.options.getString("playlist")
            const playlist = await con.manager.findOneBy("Playlists",{member:user,playlist_name:playlistName},{songs:true});
            const songs = await con.manager.findBy("Songs",{playlist:playlist})
            const playlistFields=[];
            try{
            songs.forEach(async (s,i) => {
                    playlistFields.push({name:`${i+1}. ${s.song_title}`,value:`duration: ${s.song_duration}\nauthor: [${s.song_author}](${s.song_author_url})\n`})
            });
            }catch(e){
                console.log(e)
            }finally{
                console.log(playlistFields)
                let embed=await G("#007a0f",`${playlist.playlist_name}`,false,playlistFields,true);
                return await interaction.editReply({embeds:[embed]});
            }
        }else {
            const playlist = await con.manager.find("Playlists",{member:user},{songs:true});
            const playlistFields=[];
            playlist.map(async (s,i) => {
                try{
                console.log(s)
                playlistFields.push({name:"playlist: "+s.playlist_name,value:`amount of songs: ${0}`})
                }catch(e){
                    console.log(e)
                }
            });
            let embed;
            try{
            embed = G("#007a0f","All your playlists.",false,playlistFields,true);
            }catch(error){
                console.log(error)
            }
            return await interaction.editReply({embeds:[embed]});
        }
    }
  }