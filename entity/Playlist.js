var EntitySchema = require("typeorm").EntitySchema
module.exports = new EntitySchema({
    name:"Playlist",
    tableName:"Playlists",
    columns:{
        playlist_id:{
            primary:true,
            generated:true,
            type:"int",
            name:"playlist_id"
        },
        playlist_name:{
            type:"varchar",
            name:"playlist_name",
            nullable:false,
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
            target:"User",
            type:"many-to-one",
            nullable:false,
            joinColumn:{name:"user_id",
            referencedColumnName:"user_id"
        },
        }
    }
})