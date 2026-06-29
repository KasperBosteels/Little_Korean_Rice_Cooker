const fs = require("fs").promises;
const { existsSync } = require("fs");
const filePath = "./jsonFiles/llamahistory.json"

const MAX_HISTORY = 100; // Keep last 100 messages per conversation
let cache = null;
let loadPromise = null;

async function loadCache() {
    if (cache !== null) return cache;
    if (loadPromise) return await loadPromise;

    loadPromise = (async () => {
        try {
            if (!existsSync(filePath)) {
                cache = [];
                await fs.writeFile(filePath, "[]");
                return cache;
            }
            const rawData = await fs.readFile(filePath, "utf-8");
            cache = JSON.parse(rawData);
            return cache;
        } catch (e) {
            console.error("Error reading llama history:", e);
            cache = [];
            return cache;
        } finally {
            loadPromise = null;
        }
    })();

    return await loadPromise;
}

let isSaving = false;
let pendingSave = false;

async function saveCache() {
    if (cache === null) return;
    if (isSaving) {
        pendingSave = true;
        return;
    }
    isSaving = true;
    try {
        // Atomic write: write to tmp then rename
        const tempPath = filePath + ".tmp";
        await fs.writeFile(tempPath, JSON.stringify(cache, null, 2));
        await fs.rename(tempPath, filePath);
    } catch (err) {
        console.error("Error writing llama history:", err);
    } finally {
        isSaving = false;
        if (pendingSave) {
            pendingSave = false;
            await saveCache();
        }
    }
}

module.exports = {
    async GETALL() {
        return await loadCache();
    },
    async GET(userID, guildID, channelId) {
        const entry = await this.GET_ENTRY(userID, guildID, channelId);
        return entry ? entry.Messages : null;
    },
    async GET_ENTRY(userID, guildID, channelId) {
        const history = await this.GETALL();
        for (let i = 0; i < history.length; i++) {
            if (history[i].guildID == guildID && history[i].channelID == channelId) {
                if (guildID === "1" && history[i].userID != userID) continue;
                return history[i];
            }
        }
        return null;
    },
    async UPDATE_SUMMARY(userID, guildID, channelId, summary) {
        let history = await this.GETALL();
        for (let i = 0; i < history.length; i++) {
            if (history[i].guildID == guildID && history[i].channelID == channelId) {
                if (guildID === "1" && history[i].userID != userID) continue;
                history[i].summary = summary;
                break;
            }
        }
        await saveCache();
    },
    async ADD(userID, guildID, channelId, direction, Message) {
        const role = direction;
        let history = await this.GETALL();
        let found = false;

        for (let i = 0; i < history.length; i++) {
            if (history[i].guildID == guildID && history[i].channelID == channelId) {
                // For guild "1" (DMs), also check userID
                if (guildID === "1" && history[i].userID != userID) continue;

                history[i].lastChanged = new Date();
                history[i].Messages.push({
                    role: role,
                    content: Message
                });

                // Cap the history size
                if (history[i].Messages.length > MAX_HISTORY) {
                    history[i].Messages = history[i].Messages.slice(-MAX_HISTORY);
                }
                found = true;
                break;
            }
        }

        if (!found) {
            history.push({
                userID: userID,
                guildID: guildID,
                channelID: channelId,
                lastChanged: new Date(),
                Messages: [
                    {
                        role: role,
                        content: Message
                    }
                ]
            });
        }

        await saveCache();
    },
    // Keep REFRESH for compatibility if any other module uses it, but make it async
    async REFRESH(data) {
        cache = data;
        await saveCache();
    }
};
