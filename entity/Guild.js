var EntitySchema = require("typeorm").EntitySchema
module.exports = new EntitySchema({
    name:"Guild",
    tableName:"Guilds",
    columns:{
        guild_id:{
            primary:true,
            type:"varchar",
            generated:false,
            name:"guild_id",
            unique:true
        },
        guild_name:{
            name:"guild_name",
            nullable:true,
            unique:false,
            type:"varchar"
        },
        level_system:{
            type:"boolean",
            nullable:false,
            default:false,
            name:"level_system"
        },
        log_channel:{
            type:"varchar",
            nullable:true,
            default:null,
            name:"log_channel"
        },
        guild_prefix:{
            name:"guild_prefix",
            type:"varchar",
            nullable:false,
            unique:false,
            default:"-"
        },
        guild_profanity:{
            type:"boolean",
            nullable:true,
            default:false,
            name:"guild_profanity"
        },
        profanity_channel:{
            type:"varchar",
            nullable:true,
            default:null,
            name:"profanity_channel",
            unique:false
        },
        guild_chatbot:{
            type:"boolean",
            nullable:true,
            default:false,
            name:"guild_chatbot",
        },
        welcome:{
            name:"welcome",
            type:"boolean",
            nullable:true,
            default:false
        },
        welcome_channel:{
            name:"welcome_channel",
            type:"varchar",
            nullable:true,
            default:null,
            unique:false
        },
        welcome_message:{
            name:"welcome_message",
            type:"text",
            nullable:false,
            default:"**welcome** ${name} joined us.",
            unique:false,
        },
        leave_message:{
            name:"leave_message",
            type:"text",
            nullable:false,
            default:"**oh no**\n ${name} left.",
            unique:false
        }
    },
    relations:{
        messages:{
            target:"Message",
            type:"one-to-many",
            nullable:true,
            cascade:true,
            one:{
                referencedColumnName:"message_id"
            }
        },
        warnings:{
            target:"Warning",
            type:"one-to-many",
            cascade:true,
            nullable:true,
            one:{
                referencedColumnName:"warning_id"
            }
        },
        custom_swearlist:{
            target:"Custom_Swear",
            type:"one-to-one",
            cascade:true,
            nullable:true,
            one:{
                referencedColumnName:"list_id"
            }
        }
    },
});
