var EntitySchema = require('typeorm').EntitySchema
module.exports = new EntitySchema({
    name:"Warning",
    tableName:"Warnings",
    columns:{
        warning_id:{
            primary:true,
            generated:true,
            type:"int",
            name:"warning_id"
        },
        warning_message:{
            nullable:false,
            default:'no message',
            type:"varchar",
            name:'warning_message',
            unique:false,
        },
    },
    relations:{
        guild:{
            target:"Guild",
            type:"many-to-one",
            nullable:false,
            joinColumn:{name:"guild_id"}
        },
        member:{
            target:"Member",
            type:"many-to-one",
            nullable:false,
            joinColumn:{name:"user_id"}
        }
    }
})