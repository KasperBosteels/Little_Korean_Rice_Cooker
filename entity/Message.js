var EntitySchema = require("typeorm")

module.exports= new EntitySchema({
    name:"Message",
    tableName:"Messages",
    columns:{
        message_id:{
            primary:true,
            generated:true,
            type:"numeric"
        },
        message:{
            name:"message",
            nullable:false,
            type:"longtext",
            unique:false
        },
        channel_id:{
            name:"channel_id",
            nullable:false,
            type:"varchar",
            unique:false,
        },
    },
    relations:{
        member:{
            target:"Member",
            type:"many-to-one",
        },
        guild:{
            target:"Guild",
            type:"many-to-one",
        },

    }
})