const fs = require("node:fs").promises;
const { existsSync, readFileSync, writeFileSync } = require("node:fs");
const path = "./jsonFiles/model_configs.json";

let cache = null;

const defaultConfigs = {
    "default": {
        "user_prefix": "",
        "user_suffix": ": ",
        "use_system_role": true,
        "use_full_system_prompt": true,
        "options": {
            "temperature": 0.8,
            "top_p": 0.9,
            "repeat_penalty": 1.1
        }
    },
    "cookerv4:latest": {
        "user_prefix": "",
        "user_suffix": ": ",
        "use_system_role": true,
        "use_full_system_prompt": false,
        "use_tools": true
    },
    "cookerv5:latest": {
        "user_prefix": "",
        "user_suffix": ": ",
        "use_system_role": true,
        "use_full_system_prompt": false,
        "use_tools": true
    },
    "llama3": {
        "user_prefix": "User: ",
        "user_suffix": "\n",
        "use_system_role": true,
        "use_full_system_prompt": true,
        "use_tools": true,
        "options": {
            "temperature": 0.7,
            "stop": ["<|eot_id|>", "<|start_header_id|>"]
        }
    }
};

// Ensure the file exists
if (!existsSync(path)) {
    writeFileSync(path, JSON.stringify(defaultConfigs, null, 2));
}

module.exports = {
    async get(modelName) {
        if (!cache) {
            try {
                const rawData = await fs.readFile(path, "utf-8");
                cache = JSON.parse(rawData);
            } catch (error) {
                console.error("Error reading model_configs.json:", error);
                return defaultConfigs["default"];
            }
        }

        return cache[modelName] || cache["default"] || defaultConfigs["default"];
    },
    async refresh() {
        try {
            const rawData = await fs.readFile(path, "utf-8");
            cache = JSON.parse(rawData);
            return true;
        } catch (error) {
            console.error("Error refreshing model_configs.json:", error);
            return false;
        }
    }
};
