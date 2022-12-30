
var EntitySchema = require('typeorm').EntitySchema


module.exports = new EntitySchema({
    name:"Warning",
    tableName:"Warnings",
    columns:{
        warning_id:{
            primary:true,
            generated:true,
            type:"numeric",
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
            type:"many-to-one",
            nullable:false,
        },
        member:{
            type:"many-to-one",
            nullable:false,
        }
    }
})