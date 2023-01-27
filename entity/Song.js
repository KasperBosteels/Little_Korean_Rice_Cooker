var EntitySchema = require("typeorm").EntitySchema
module.exports = new EntitySchema({
    name:"Song",
    tableName:"Songs",
    columns:{
        song_id:{
            primary:true,
            generated:true,
            type:"int",
            name:"song_id"
        },
        song_url:{
            type:"varchar",
            name:"song",
            nullable:false,
            unique:false,
        },
        song_title:{
            type:"varchar",
            name:"title",
            nullable:false,
            unique:false,
        },
        song_thumbnail:{
        type:"varchar",
        name:"thumbnail",
        nullable:true,
        unique:false   
        },
        song_duration:{
            type:"varchar",
            name:"duration",
            nullable:false,
            unique:false
        },
        song_author:{
            type:"varchar",
            name:"author",
            nullable:false,
            unique:false,
        },
        song_author_url:{
            type:"varchar",
            name:"author_url",
            nullable:false,
            unique:false
        }
    },
    relations:{
        playlist:{
            target:"Playlist",
            type:"many-to-one",
            nullable:false,
            cascade:true,
            onDelete:"CASCADE",
            eager:true,
            joinColumns:{name:"playlist_id",
            referencedColumnName:"playlist_id"
        },
        }
    }
})