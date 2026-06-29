const dataHandler = require("../DataHandlers/llamaMessageHistory.js");

module.exports = {
    name: "get_history_search",
    definition: {
        type: "function",
        function: {
            name: "get_history_search",
            description: "Search your internal memory/history for specific keywords or topics to find older information.",
            parameters: {
                type: "object",
                properties: {
                    query: {
                        type: "string",
                        description: "The keyword or phrase to search for in past messages."
                    }
                },
                required: ["query"]
            }
        }
    },
    async execute(message, args) {
        try {
            const query = args.query.toLowerCase();
            const guildId = message.guild == null ? "1" : message.guild.id;
            const historyData = await dataHandler.GET_ENTRY(message.author.id, guildId, message.channel.id);
            
            if (!historyData || !historyData.Messages || historyData.Messages.length === 0) {
                return "No conversation history found to search.";
            }

            console.log(`\x1b[35m[AI Tool Call]\x1b[0m AI searching history for: "${query}"`);

            // Filter messages that contain the query
            const matches = historyData.Messages.filter(m => 
                m.content.toLowerCase().includes(query)
            );

            if (matches.length === 0) {
                return `No messages found in history containing "${query}".`;
            }

            // Return the last 10 matches to avoid overwhelming the context
            const limitedMatches = matches.slice(-10);
            
            const result = limitedMatches.map(m => `[${m.role}] ${m.content}`).join("\n---\n");
            
            return `Found ${matches.length} matching messages in history (showing latest ${limitedMatches.length}):\n${result}`;
        } catch (err) {
            console.error("Tool get_history_search failed:", err);
            return `Error: Failed to search history. ${err.message}`;
        }
    }
};
