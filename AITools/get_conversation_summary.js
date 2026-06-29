const { callOllama } = require("../DataHandlers/ollamaClient.js");
const dataHandler = require("../DataHandlers/llamaMessageHistory.js");
require("dotenv").config();

module.exports = {
    name: "get_conversation_summary",
    definition: {
        type: "function",
        function: {
            name: "get_conversation_summary",
            description: "Get a concise summary of the conversation so far to refresh your memory of older messages.",
            parameters: {
                type: "object",
                properties: {
                    focus: {
                        type: "string",
                        description: "Optional: A specific topic or detail to focus the summary on."
                    }
                }
            }
        }
    },
    async execute(message, args) {
        try {
            const guildId = message.guild == null ? "1" : message.guild.id;
            const historyData = await dataHandler.GET_ENTRY(message.author.id, guildId, message.channel.id);
            
            if (!historyData || !historyData.Messages || historyData.Messages.length === 0) {
                return "No conversation history found to summarize.";
            }

            console.log(`\x1b[35m[AI Tool Call]\x1b[0m AI requested conversation summary. Summarizing ${historyData.Messages.length} messages...`);

            const summarizerModel = process.env.SUMMARIZER_MODEL || "llama3.2:1b";
            
            const prompt = args.focus 
                ? `Summarize the following conversation, focusing specifically on: ${args.focus}. Keep it concise but include key details.`
                : "Summarize the following conversation concisely, highlighting the main topics and any important facts mentioned.";

            const messagesForSummarizer = [
                { role: "system", content: prompt },
                ...historyData.Messages.map(m => ({ role: m.role, content: m.content }))
            ];

            const response = await callOllama(summarizerModel, messagesForSummarizer);
            const summary = response.message.content;

            // Update the persistent summary in the history file
            await dataHandler.UPDATE_SUMMARY(message.author.id, guildId, message.channel.id, summary);

            return `Summary of previous conversation:\n${summary}`;
        } catch (err) {
            console.error("Tool get_conversation_summary failed:", err);
            return `Error: Failed to generate summary. ${err.message}`;
        }
    }
};
