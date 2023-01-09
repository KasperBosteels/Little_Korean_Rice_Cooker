const {
    StringSelectMenuOptionBuilder,
    StringSelectMenuBuilder,
    ActionRowBuilder,
  } = require("discord.js");
module.exports = {
async GenerateSelectMenu (menuId,placeholder,min_value=1,max_value=1,options){
  let selectoptions = []
  options.map((o)=>selectoptions.push(new StringSelectMenuOptionBuilder({label:o.label,description:o.description,value:o.value})));
  console.log(selectoptions)
  if(!menuId || !placeholder || !options[0].label || options[0].description)throw new Error("Select Menu is missing certain variables.");
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