const os = require('os');
const { version } = require('discord.js');
const pkg = require('../package.json');

module.exports = {
    name: "get_system_info",
    definition: {
        type: "function",
        function: {
            name: "get_system_info",
            description: "Get information about the bot's system environment, versions, and performance status.",
            parameters: {
                type: "object",
                properties: {}
            }
        }
    },
    async execute(message, args) {
        try {
            const uptimeSeconds = process.uptime();
            const days = Math.floor(uptimeSeconds / 86400);
            const hours = Math.floor(uptimeSeconds / 3600) % 24;
            const minutes = Math.floor(uptimeSeconds / 60) % 60;
            const seconds = Math.floor(uptimeSeconds % 60);

            const memory = process.memoryUsage();
            
            const info = {
                botName: "Little Korean Rice Cooker",
                version: pkg.version,
                discordJSVersion: version,
                nodeVersion: process.version,
                environment: "Docker (Linux)",
                platform: os.platform(),
                arch: os.arch(),
                uptime: `${days}d ${hours}h ${minutes}m ${seconds}s`,
                memoryUsage: {
                    heapUsed: `${(memory.heapUsed / 1024 / 1024).toFixed(2)} MB`,
                    heapTotal: `${(memory.heapTotal / 1024 / 1024).toFixed(2)} MB`,
                    rss: `${(memory.rss / 1024 / 1024).toFixed(2)} MB`
                },
                cpuCount: os.cpus().length,
                loadAverage: os.loadavg()
            };
            
            console.log(`\x1b[35m[AI Tool Call]\x1b[0m AI requested system environment info.`);
            return JSON.stringify(info);
        } catch (err) {
            console.error("Tool get_system_info failed:", err);
            return "Error: Failed to fetch system status.";
        }
    }
};
