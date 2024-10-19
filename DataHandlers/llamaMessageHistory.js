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
    GET(userID) {
        let rawData = fs.readFileSync(
            filePath,
            "utf-8"
        );
        let file = JSON.parse(rawData);
        for (let i = 0; i < file.length; i++) {
            if (file[i].userID == userID) {
                return file[i].Messages;
            }
        }
        return null;
    },
    ADD(userID, direction, Message) {
        let role = direction
        let history = this.GETALL();
        if (history.filter(x => x.userID == userID).length == 0) {
            history.push({
                userID: userID,
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
                if (history[i].userID == userID) {
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
};
