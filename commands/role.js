
const discord = require("discord.js");
const ms = require("ms");
        module.exports = {
            name: 'role',
            description: 'work in progress',
            args:'true',
            usage: '<user> <role> if you want to add a role,\n<user> no <role> if you want to remove a role',
            guildOnly:'true',
            category: "moderating",
            execute(client,message, args,con) {
        if(!permissioncheck(message))return message.reply('there is a conflict with the permissions')
        if(message.mentions.members.size){
            var users = message.mentions.members   
        }else {
           var users = message.author;
        }
        //var role = GetRole(args,message)
        var role  = GetRole(args,message);

        //remove or add the roles
        if(!remove(args)){
           return removeRole(role,users);
        }else{
            return addRole(role,users);
        }
        ;
    },  
};
function addRole(role,users){
for (let i = 0; i < users.length; i++) {
    const user = users[i];
    setTimeout(() =>{
        console.log(user.roles);
        user.roles.add(role);
        console.log('added role to user');
    },ms(100))
}
console.log('done');
}

function removeRole(role,users){
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        setTimeout(() =>{
            user.roles.remove(role.id);
            console.log('removed role to user');
        },ms(100))
    }
    console.log('done');
    }
function remove(args){
    let value = true
    for (let i = 0; i < args.length; i++) {
        const item = args[i];
        if(item.toLowerCase() == 'no')value = false;
    }
    return value;
}
function permissioncheck(message){
        //check perms
        if (!message.member.hasPermission("MANAGE_ROLES")) return false;
        if (!message.guild.me.hasPermission("MANAGE_ROLES"))return false;
        return true;
}
function GetRole(args,message){
    let mentionedrole;
    mentionedrole = message.mentions.roles.first();
    if(!mentionedrole){
    args.forEach(arg => {
       if(!arg.startsWith('<@') && !arg.endsWith('>') && arg.toLowerCase != 'no'){
        mentionedrole = message.guild.roles.cache.find(role => role.name === arg);
       }
   });
    }
    if(!mentionedrole)return message.channel.send("didn't find the role, sorry.");
   return mentionedrole;
}