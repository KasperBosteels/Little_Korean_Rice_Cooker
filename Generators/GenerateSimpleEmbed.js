const { MessageEmbed } = require("discord.js");
module.export = {
  GenerateEmbed(
    color = false,
    description = false,
    footer = false,
    fields = false,
    timestamp = false,
    image = false,
    title = false,
    url = false
  ) {
    const embed = new MessageEmbed().setAuthor({
      name: "Little_Korean_Rice_Cooker",
      url: "https://discord.com/api/oauth2/authorize?client_id=742037772503744582&permissions=1514516376694&scope=bot",
      iconURL: "https://i.imgur.com/A2SSxSE.png",
    });
    if (color != false) embed.setColor(color);
    if (description != false) embed.setDescription(description);
    if (footer != false)
      embed.setFooter({ text: footer.text, inconURL: footer.url });
    if (fields != false) {
      fields.forEach((field) => {
        embed.addField(field.name, field.content);
      });
    }
    if (timestamp != false) embed.timestamp();
    if (image != false) embed.setImage(image);
    if (title != false) embed.setTitle(title);
    if (url != false) embed.setURL(url);
    return embed;
  },
};
