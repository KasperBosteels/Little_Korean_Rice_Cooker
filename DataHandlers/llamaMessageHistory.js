const fs = require("fs");
const filePath = "./jsonFiles/llamahistory.json"

const MAX_HISTORY = 100; // Keep last 100 messages per conversation

module.exports = {
    GETALL() {
        try {
            if (!fs.existsSync(filePath)) {
                fs.writeFileSync(filePath, "[]");
                return [];
            }
            let rawData = fs.readFileSync(filePath, "utf-8");
            return JSON.parse(rawData);
        } catch (e) {
            console.error("Error reading llama history:", e);
            return [];
        }
    },
    GET(userID, guildID, channelId) {
        const entry = this.GET_ENTRY(userID, guildID, channelId);
        return entry ? entry.Messages : null;
    },
    GET_ENTRY(userID, guildID, channelId) {
        const file = this.GETALL();
        for (let i = 0; i < file.length; i++) {
            if (file[i].guildID == guildID && file[i].channelID == channelId) {
                if (guildID === "1" && file[i].userID != userID) continue;
                return file[i];
            }
        }
        return null;
    },
    UPDATE_SUMMARY(userID, guildID, channelId, summary) {
        let history = this.GETALL();
        for (let i = 0; i < history.length; i++) {
            if (history[i].guildID == guildID && history[i].channelID == channelId) {
                if (guildID === "1" && history[i].userID != userID) continue;
                history[i].summary = summary;
                break;
            }
        }
        this.REFRESH(history);
    },
    ADD(userID, guildID, channelId, direction, Message) {
        const role = direction;
        let history = this.GETALL();
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

        this.REFRESH(history);
    },
    REFRESH(data) {
        try {
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        } catch (err) {
            console.error("Error writing llama history:", err);
        }
    }
};
