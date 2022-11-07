const controlLevel = require("../DataHandlers/leveling_enabled").GET;
const G = require("../Generators/GenerateSimpleEmbed").GenerateEmbed;
const controlPrefix = require("../DataHandlers/getprefixData").GET;
const updateprefix = require("../commands/changeprefix").update;
const updateLevel = require("../commands/leveling").update;
module.exports = {
  async execute(interaction, con) {
    let prefixchange = false,
      level = false;
    const prefix = interaction.fields.getTextInputValue("pid");
    const levelsystem = await interaction.fields.getField("lsid").values;
    console.log(levelsystem);
    const currentlevelstatus = controlLevel(interaction.guildId);
    if (prefix != controlPrefix(interaction.guild.id)) {
      prefixchange = await updateprefix(interaction.guild.id, prefix);
    }
    if (
      (levelsystem == "1" && !currentlevelstatus) ||
      (levelsystem == "0" && currentlevelstatus)
    ) {
      level = updateLevel(interaction.guildId, levelsystem);
    }
    await interaction.editReply({
      embeds: [
        G(
          "RANDOM",
          `current prefix changed: ${prefixchange}\nlevel system status changed: ${level}`
        ),
      ],
    });
  },
};
