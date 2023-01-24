const { PermissionsBitField } = require("discord.js");
const welcome_data = require("../DataHandlers/welcome_message_data_collector");
module.exports = {
  name: "custom_welcome",
  description:
    "set a custom welcome message.\n``` to use a username => {user}\n to say the servername => {server}```\nTo disable custom welcome type 'disable' after the command.",
  cooldown: 1,
  usage: "<your message>",
  guildOnly: "true",
  aliases: ["welcomemessage", "customwelcome", "welcome"],
  category: "config",
  perms: ["SendMessages"],
  userperms: ["Administrator"],
  async execute(client, message, args, con) {
    //check perms
    if (!permission(message))
      return message.reply({
        content: "Only an administrator is able to use this command.",
      });
    //assigns id to variables and check if received
    var guildid = message.guild.id;
    if (!guildid)
      return console.log(
        "I was unnable to determine this guilds id, try again later."
      );
      const guild = await con.manager.findOneBy('Guilds',{guild_id:guildid});
    if (args[0] && args[0].toLowerCase() == "disable") {
    
      guild.welcome_message=undefined;
      try{
        await con.manager.save("Guids",guild)
        await welcome_data.execute(con);
        return message.channel.send({
          content: "I removed your servers welcome message.",
        });
      }catch(e){
        console.log(e)
        message.channel.send({
          content: "An error occured try again later.",
        });
      }
    } else {
      //checks if database already exists if true update else insert
      guild.welcome_message = args.join(" ");
      try{
        await con.manager.save("Guilds",guild)
        await welcome_data.execute(con);
        return message.channel.send({
          content: "Your custom welcome message was saved.",
        });
      }catch(e){
        console.log(e)
        message.channel.send({
          content: "An error occured try again later.",
        });

      }
    }
  }
};
function permission(message) {
  //check perms
  if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
    return false;
  }
  return true;
}
