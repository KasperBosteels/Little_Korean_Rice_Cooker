const {
    StringSelectMenuOptionBuilder,
    StringSelectMenuBuilder,
    ActionRowBuilder,
  } = require("discord.js");
module.exports = {
async GenerateSelectMenu (menuId,placeholder,min_value,max_value,options){
  let selectoptions = options.map((o)=>new StringSelectMenuOptionBuilder({label:o.label,description:o.description,value:o.value,emoji:o.emoji}));
    let min=min_value?min_value:1,max=max_value?max_value:1
    const menu = new StringSelectMenuBuilder()
      .setCustomId(menuId)
      .setPlaceholder(placeholder)
      .setMinValues(min)
      .setMaxValues(max);
      menu.addOptions(selectoptions);
      console.log(menu)
      return menu;
}
}