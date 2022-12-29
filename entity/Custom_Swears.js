var EntitySchema = require("typeorm")
module.exports = new EntitySchema({
    name:"Custom_Swear",
    tableName:"Custom_Swears",
    columns:{
        list_id:{
            primary:true,
            generated:true,
            name:"list_id",
            type:"numeric",
        },
        swear_list:{
            type:"longtext",
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
