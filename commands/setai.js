const aiModelHandler = require("../DataHandlers/aiModelHandler.js");
const modelConfig = require("../DataHandlers/modelConfig.js");
const authHandler = require("../DataHandlers/authHandler.js");

module.exports = {
  name: "setai",
  description: "Sets the AI model for the bot (restricted).",
  usage: "<model name>",
  args: true,
  category: "config",
  async execute(client, message, args, con) {
    // Restricted to specific user IDs
    if (!authHandler.isAuthorized(message.author.id)) {
      return message.reply({ content: "You do not have permission to use this command." });
    }

    const modelName = args.join(" ");
    if (!modelName) {
      return message.reply({ content: "Please provide a model name." });
    }

    const success = await aiModelHandler.set(modelName);
    if (success) {
      await modelConfig.refresh(); // Refresh config cache when model changes
      return message.channel.send({ content: `AI model has been set to: \`${modelName}\`` });
    } else {
      return message.channel.send({ content: "There was an error updating the AI model." });
    }
  },
};
