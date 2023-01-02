var EntitySchema = require("typeorm").EntitySchema
module.exports = new EntitySchema({
    name:"Custom_Swear",
    tableName:"Custom_Swears",
    columns:{
        list_id:{
            primary:true,
            generated:true,
            name:"list_id",
            type:"int",
        },
        swear_list:{
            type:"text",
            unique:false,
            nullable:true,
            name:"swear_list",
        }
    },
    relations:{
        guild:{
            target:"Guild",
            type:"one-to-one",
        }
    }
})
