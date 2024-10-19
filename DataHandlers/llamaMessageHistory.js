const fs = require("fs");
const filePath = "./jsonFiles/llamahistory.json"
module.exports = {
    GETALL() {
        let rawData = fs.readFileSync(
            filePath,
            "utf-8"
        );
        return JSON.parse(rawData);
    },
    GET(userID, guildID) {
        let rawData = fs.readFileSync(
            filePath,
            "utf-8"
        );
        let file = JSON.parse(rawData);
        for (let i = 0; i < file.length; i++) {
            if (file[i].userID == userID && file[i].guildID == guildID) {
                return file[i].Messages;
            }
        }
        return null;
    },
    ADD(userID, guildID, direction, Message) {
        let role = direction
        let history = this.GETALL();
        console.log(history)
        if (history.filter(x => x.userID == userID && x.guildID == guildID).length == 0) {
            history.push({
                userID: userID,
                guildID:guildID,
                lastChanged: new Date(),
                Messages: [
                    {
                        role: "user",
                        content: Message
                    }
                ]
            });
        } else {
            for (let i = 0; i < history.length; i++) {
                if (history[i].userID == userID && history[i].guildID == guildID) {
                    history[i].lastChanged = new Date(),
                    history[i].Messages.push({
                        role: role,
                        content: Message
                    });
                }
            }
        }

        fs.writeFileSync(filePath, JSON.stringify(history), (err) => {
            if (err) {
                return console.error(err);
            }
        });
    },
    REFRESH(data){
        fs.writeFileSync(filePath, JSON.stringify(data), (err) => {
            if (err) {
                return console.error(err);
            }
        });
    }
};
