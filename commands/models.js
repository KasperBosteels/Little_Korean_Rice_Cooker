require("dotenv").config();
const authHandler = require("../DataHandlers/authHandler.js");

module.exports = {
  name: "models",
  description: "Displays the available Ollama models.",
  category: "config",
  async execute(client, message, args, con) {
    // Restricted to specific user IDs
    if (!authHandler.isAuthorized(message.author.id)) {
      return message.reply({ content: "You do not have permission to use this command." });
    }

    if (!process.env.LLAMA_URL) {
      return message.channel.send({ content: "Ollama URL is not configured in .env." });
    }

    // Derive the tags endpoint from the chat endpoint
    const url = process.env.LLAMA_URL.replace('/api/chat', '/api/tags');

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch models: ${response.statusText}`);
      }

      const data = await response.json();
      if (!data.models || data.models.length === 0) {
        return message.channel.send({ content: "No models found on the Ollama server." });
      }

      // Format output closer to 'ollama list'
      // NAME            ID              SIZE      MODIFIED
      let output = "NAME".padEnd(30) + "ID".padEnd(14) + "SIZE".padEnd(10) + "MODIFIED\n";
      output += "=".repeat(70) + "\n";

      data.models.forEach(m => {
        const name = m.name.length > 29 ? m.name.substring(0, 26) + "..." : m.name;
        const id = m.digest ? m.digest.substring(0, 12) : "N/A";
        const sizeGB = (m.size / (1024 * 1024 * 1024)).toFixed(1) + " GB";
        
        // Simple relative time
        let modified = "N/A";
        if (m.modified_at) {
            const date = new Date(m.modified_at);
            const now = new Date();
            const diffMs = now - date;
            const diffMin = Math.floor(diffMs / (1000 * 60));
            const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
            const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
            
            if (diffDays > 0) {
                modified = `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
            } else if (diffHours > 0) {
                modified = `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
            } else if (diffMin > 0) {
                modified = `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
            } else {
                modified = "Just now";
            }
        }

        output += `${name.padEnd(30)}${id.padEnd(14)}${sizeGB.padEnd(10)}${modified}\n`;
      });

      // Split into multiple messages if too long for Discord (2000 chars)
      if (output.length > 1900) {
          // Simplistic splitting if needed, but usually ollama list is short
          return message.channel.send({ content: "```\n" + output.substring(0, 1900) + "\n... (truncated)```" });
      }

      return message.channel.send({ content: "```\n" + output + "```" });

    } catch (error) {
      console.error("Error fetching models:", error);
      return message.channel.send({ content: "There was an error fetching the models from Ollama. Make sure Ollama is running and accessible." });
    }
  },
};
