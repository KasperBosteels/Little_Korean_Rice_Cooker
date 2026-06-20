const fs = require("node:fs");
const path = "./jsonFiles/aimodel.json";

// Ensure the file exists
if (!fs.existsSync(path)) {
    fs.writeFileSync(path, JSON.stringify({ model: null }));
}

module.exports = {
    get() {
        try {
            const rawData = fs.readFileSync(path, "utf-8");
            const data = JSON.parse(rawData);
            return data.model;
        } catch (error) {
            console.error("Error reading aimodel.json:", error);
            return null;
        }
    },
    set(modelName) {
        try {
            const data = { model: modelName };
            fs.writeFileSync(path, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error("Error writing aimodel.json:", error);
            return false;
        }
    }
};
