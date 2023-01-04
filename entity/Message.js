var EntitySchema = require("typeorm").EntitySchema
module.exports= new EntitySchema({
    name:"Message",
    tableName:"Messages",
    columns:{
        message_id:{
            primary:true,
            generated:true,
            type:"int"
        },
        topic:{
            name:"topic",
            nullable:true,
            type:"text",
            unique:false,
        },
        message:{
            name:"message",
            nullable:false,
            type:"longtext",
            unique:false
        },
    },
    relations:{
        member:{
            target:"User",
            type:"many-to-one",
            joinColumns:{
                name:"user_id",
                ReferencedColumnName:"user_id"
            },
        },
        guild:{
            target:"Guild",
            type:"many-to-one",
            nullable:true,
            joinColumns:{
                name:"guild_id",
                ReferencedColumnName:"guild_id"
            },
        },
    }
})