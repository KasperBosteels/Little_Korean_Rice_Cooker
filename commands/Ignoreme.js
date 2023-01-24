const ignoreusers = require("../DataHandlers/ignored_users");
module.exports = {
  name: "ignore-me",
  description: "I will remove almost all you data, and ignore you.",
  cooldown: 1,
  usage: " ",
  category: "config",
  perms: ["SendMessages"],
  userperms: [],
  async execute(client, message, args, con) {
    let id = message.author.id;
    if (!id) return console.log("no ID found from message.");
    let data_removed_string = " ";
    const user = await con.manager.findOneBy("Users", {user_id:id});
    try{
      user.user_name=null;
      user.user_level=0
      user.is_ignored=true
      user.user_experience=0
      user.user_score=0
      await con.manager.save("Users",user);
      data_removed_string =
      "Removed non-critical data from user.";
    }catch(e){
      console.log(e)
      data_removed_string = "Unable to remove non-critical data from user.";
    }


    try{
      await con.manager.delete("Messages",{member:user});
      data_removed_string+="\nSuccesfully removed messages."
    }catch(e){
      console.log(e)
      data_removed_string+="\nUnable to remove messages."
    }

    try{
      await con.manager.delete("Playlists",{member:user});
      data_removed_string+="\nSucessfully removed playlists."
    }catch(e){
      console.log(e)
      data_removed_string+="\nUnable to remove playlists."
    }
    await ignoreusers.execute(con);
    return message.reply({ content: `${data_removed_string}` });
  },
};
