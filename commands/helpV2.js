const botconfig = require("../auth.json");
const getprefix = require("../getprefixData.js");
const { MessageEmbed, Permissions } = require("discord.js");
const dropdown = require("../dropdown");
var prefix = "-";
//page settings
module.exports = {
  name: "help",
  description: "List all of my commands or info about a specific command.",
  aliases: ["commands"],
  usage: "optional: [command name]\n optional: [category]",
  cooldown: 5,
  category: "general",
  perms: ["SEND_MESSAGES", "MANAGE_MESSAGES"],
  userperms: [],
  async execute(client, message, args, con, options, button) {
    prefix = await this.guildprefix(message.guild.id);

    //checks if a specific command query was asked if not send dm withh all commmands
    if (
      !args.length &&
      !message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)
    ) {
      return message.reply({ embeds: [await firstPage(prefix)] });
    }
    if (
      !args.length &&
      message.guild.me.permissions.has([
        Permissions.FLAGS.SEND_MESSAGES,
        Permissions.FLAGS.MANAGE_MESSAGES,
        Permissions.FLAGS.EMBED_LINKS,
      ])
    ) {
      //#region create command list in strings
      var commandlist = [];
      //for each command in commands folder get name description and category and usage
      client.commands.forEach((command) => {
        var constructor = {
          name: command.name,
          description: command.description,
          category: command.category,
          usage: command.usage,
        };
        //assign values to command list array
        commandlist.push(constructor);
      });
      //default markup
      let general = [];
      let moderating = [];
      let fun = [];
      let debug = [];
      let music = [];
      let currency = [];
      //for the every command in the commandlist add values to a string from its category
      for (let i = 0; i < commandlist.length; i++) {
        const command = commandlist[i];
        if (command["category"] == "general") {
          general[i] = command;
        } else if (command["category"] == "moderating") {
          moderating[i] = command;
        } else if (command["category"] == "config") {
          debug[i] = command;
        } else if (command["category"] == "fun") {
          fun[i] = command;
        } else if (command["category"] == "music") {
          music[i] = command;
        } else if (command["category"] == "currency") {
          currency[i] = command;
        }
      }
      var response = [
        await MakeEmbed(general, prefix, 2),
        await MakeEmbed(fun, prefix, 3),
        await MakeEmbed(music, prefix, 4),
        await MakeEmbed(moderating, prefix, 5),
        await MakeEmbed(debug, prefix, 6),
      ];
      response.unshift(await firstPage(prefix));

      dropdown.execute(client, message, response);
      //END UNSPECIFIED HELP RECUEST
      //if specific command was asked
    } else if (
      !args.length ||
      args[0] == "index" ||
      args[0] == "general" ||
      args[0] == "fun" ||
      args[0] == "music" ||
      args[0] == "config" ||
      args[0] == "moderating" ||
      args[0] == 1 ||
      args[0] == 2 ||
      args[0] == 3 ||
      args[0] == 4 ||
      args[0] == 5 ||
      args[0] == 6
    ) {
      //#region repeated code
      var commandlist = [];

      //for each command in commands folder get name description and category and usage
      client.commands.forEach((command) => {
        var constructor = {
          name: command.name,
          description: command.description,
          category: command.category,
          usage: command.usage,
          perms: command.perms,
          userperms: command.userperms,
        };
        //assign values to command list array
        commandlist.push(constructor);
      });
      //default markup

      let general = [];
      let moderating = [];
      let fun = [];
      let debug = [];
      let music = [];
      let currency = [];
      //for the every command in the commandlist add values to a string from its category
      for (let i = 0; i < commandlist.length; i++) {
        const command = commandlist[i];
        if (command["category"] == "general") {
          general[i] = command;
        } else if (command["category"] == "moderating") {
          moderating[i] = command;
        } else if (command["category"] == "config") {
          debug[i] = command;
        } else if (command["category"] == "fun") {
          fun[i] = command;
        } else if (command["category"] == "music") {
          music[i] = command;
        } else if (command["category"] == "currency") {
          currency[i] = command;
        }
      }
      var response = [
        await MakeEmbed(general, prefix, 2),
        await MakeEmbed(fun, prefix, 3),
        await MakeEmbed(music, prefix, 4),
        await MakeEmbed(moderating, prefix, 5),
        await MakeEmbed(debug, prefix, 6),
      ];
      response.unshift(await firstPage(prefix));
      if (!args.length) {
        return message.reply({ embeds: response[0] });
      } else {
        switch (args[0]) {
          case "index":
            return message.reply({ embeds: [response[0]], ephemeral: true });
          case "1":
            return message.reply({ ephemeral: true, embeds: [response[0]] });
          case "general":
            return message.channel.send({
              ephemeral: true,
              embeds: [response[1]],
            });
          case "2":
            return message.channel.send({
              ephemeral: true,
              embeds: [response[1]],
            });
          case "fun":
            return message.channel.send({
              ephemeral: true,
              embeds: [response[2]],
            });

          case "3":
            return message.channel.send({
              ephemeral: true,
              embeds: [response[2]],
            });
          case "music" || "4":
            return message.channel.send({
              ephemeral: true,
              embeds: [response[3]],
            });

          case "4":
            return message.channel.send({
              ephemeral: true,
              embeds: [response[3]],
            });
          case "moderating":
            return message.channel.send({
              ephemeral: true,
              embeds: [response[4]],
            });

          case "5":
            return message.channel.send({
              ephemeral: true,
              embeds: [response[4]],
            });
          case "config":
            return message.channel.send({
              ephemeral: true,
              embeds: [response[5]],
            });

          case "6":
            return message.channel.send({
              ephemeral: true,
              embeds: [response[5]],
            });
          default:
            return message.channel.send({
              ephemeral: true,
              embeds: [response[0]],
            });
        }
      }
      //#endregion
    } else {
      const data = [];
      const { commands } = message.client;
      //get the command that was mentioned check all the names and aliases
      const name = args[0].toLowerCase();
      const command =
        commands.get(name) ||
        commands.find((c) => c.aliases && c.aliases.includes(name));

      //if there is no command found return
      if (!command) {
        return message.reply({
          content: `That was not a valid command!\ntype: "${prefix}help" for all commands.`,
          ephemeral: true,
        });
      }

      //push values to data array
      let embed = new MessageEmbed();
      embed.setTitle(`**${command.name}**`).setColor("#00ff00");
      embed.setDescription("**aliases:**", `${command.aliases}`);
      embed.addField("**Description:**", `${command.description}`);
      embed.addField("**usage:**", `${prefix}${command.name} ${command.usage}`);
      embed.addField("**cooldown:**", `${command.cooldown || 3} second(s)`);
      if (command.perms.length > 0)
        embed.addField("```bot permissions```", `\`\`\`${command.perms}\`\`\``);
      if (command.userperms.length > 0)
        embed.addField(
          `\`\`\`user permissions\`\`\``,
          `\`\`\`${command.userperms}\`\`\``
        );
      //send
      return message.reply({ embeds: [embed], ephemeral: true });
    }
  },
  guildprefix(guildID) {
    let p = getprefix.GET(guildID);
    if (p) {
      return p;
    } else {
      return botconfig.prefix;
    }
  },
};
function MakeEmbed(content, prefix, i) {
  let embed = new MessageEmbed()
    .setAuthor({
      name: "Little_Korean_Rice_Cooker",
      url: "https://discord.com/api/oauth2/authorize?client_id=742037772503744582&permissions=1514516376694&scope=bot",
      iconURL: "https://i.imgur.com/A2SSxSE.png",
    })
    .setColor("#00ff00");
  content.forEach((item) => {
    embed.addField(
      `${item.name}`,
      `\`\`\`${prefix}${item.name}\n${item.description}\n${prefix}${item.name} ${item.usage}\`\`\``
    );
  });
  embed.setFooter({
    text: `You can find more info about a command by using: ${prefix}help <command name>\npage: ${i}/6`,
  });
  return embed;
}
function firstPage(prefix) {
  let embed = new MessageEmbed()
    .setTitle("Little Korean Rice Cooker guide")
    .setAuthor({
      name: "Little_Korean_Rice_Cooker",
      url: "https://discord.com/api/oauth2/authorize?client_id=742037772503744582&permissions=1514516376694&scope=bot",
      iconURL: "https://i.imgur.com/A2SSxSE.png",
    })
    .setColor("#00ff00");
  embed.addField(
    ":bookmark: index",
    `\`\`\`${prefix}help \`\`\``,
    (inline = true)
  );
  embed.addField(
    ":thinking: general",
    `\`\`\`${prefix}help general\`\`\``,
    (inline = true)
  );
  embed.addField(
    ":upside_down: fun",
    `\`\`\`${prefix}help fun\`\`\``,
    (inline = true)
  );
  embed.addField(
    ":notes: music",
    `\`\`\`${prefix}help music\`\`\``,
    (inline = true)
  );
  embed.addField(
    ":eyes: moderating",
    `\`\`\`${prefix}help moderating\`\`\``,
    (inline = true)
  );
  embed.addField(
    ":screwdriver: config",
    `\`\`\`${prefix}help config\`\`\``,
    (inline = true)
  );
  embed.addField(
    ":books: quick guide",
    `\`\`\`${prefix}help "command name"\nFor extra information about a command.\`\`\``
  );
  embed.addField(
    ":file_cabinet: remove my data/ignore me",
    `\`\`\`Your data is in no way traded or handed to third parties.\nyou can delete any stored data with the "${prefix}ignore-me" command(the bot will ignore you from this point on).\`\`\``
  );
  embed.addField(
    ":question: support",
    `If you need additional help, you can join **[the support server](https://discord.gg/y8QDMpuwZs)**.`
  );
  embed.setFooter({ text: "page: 1/6" });
  return embed;
}
