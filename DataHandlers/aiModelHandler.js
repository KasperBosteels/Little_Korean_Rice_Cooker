const fs = require("node:fs").promises;
const { existsSync, readFileSync, writeFileSync } = require("node:fs");
const path = "./jsonFiles/aimodel.json";

let cache = null;

// Ensure the file exists
if (!existsSync(path)) {
    writeFileSync(path, JSON.stringify({ model: null }));
}

module.exports = {
    get() {
        if (cache !== null) return cache;
        try {
            const rawData = readFileSync(path, "utf-8");
            const data = JSON.parse(rawData);
            cache = data.model;
            return cache;
        } catch (error) {
            console.error("Error reading aimodel.json:", error);
            return null;
        }
    },
    async set(modelName) {
        try {
            const data = { model: modelName };
            await fs.writeFile(path, JSON.stringify(data));
            cache = modelName;
            return true;
        } catch (error) {
            console.error("Error writing aimodel.json:", error);
            return false;
        }
    }
};
