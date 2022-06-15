const controlLevel = require("./leveling_enabled").GET;
const G = require("./Generators/GenerateSimpleEmbed").GenerateEmbed;
const controlPrefix = require("./getprefixData").GET;
const updateprefix = require("./commands/changeprefix").update;
const updateLevel = require("./commands/leveling").update;
module.exports = {
  async execute(interaction) {
    interaction.deferReply();
    console.log(interaction);
    let prefixchange = false;
    let level = false;
    if (interaction.customId == "a") {
      const prefix = interaction.fields.getTextInputValue("pid");
      const levelsystem = interaction.gields.getSelectInputValue("lsid");
      const currentlevelstatus = controlLevel(interaction.guildId);
      if (prefix != controlPrefix(interaction.guildId)) {
        prefixchange = await updateprefix(interaction.guildId, prefix);
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
    }
  },
};
