var EntitySchema = require("typeorm").EntitySchema
module.exports = new EntitySchema({
    name:"Playlist",
    tableName:"Playlists",
    columns:{
        playlist_id:{
            primary:true,
            generated:true,
            type:"numeric",
            name:"playlist_id"
        },
        playlist_name:{
            type:"varchar",
            name:"playlist_name",
            default:toString(this.playlist_id),
            nullable:true,
            unique:false,
        },
        playlist_songs:{
            name:"playlist_songs",
            nullable:false,
            unique:false,
            type:"longtext"
        }

    },
    relations:{
        member:{
            target:"Member",
            type:"many-to-one",
            nullable:false,
        }
    }
})