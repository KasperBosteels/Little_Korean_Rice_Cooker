import "reflect-metadata"
import { DataSource } from "typeorm"
import { Member } from "./entity/Member"
import { Guild } from "./entity/guild";
import { Message } from "./entity/Message";
import { Playlist } from "./entity/Playlist";
import { Profanity } from "./entity/Profanity";
import { Social_credit } from "./entity/Social_credit";
import { Swearword } from "./entity/Swearword";
import { Warning } from "./entity/Warning";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.HOST,
    port: 3306,
    username: process.env.USERSQLSERVER,
    password: process.env.PASSWORDSQLSERVER,
    database: process.env.DATABASE,
    synchronize: true,
    logging: true,
    entities:[Member,Guild,Message,Playlist,Profanity,Social_credit,Swearword,Warning],
    migrations: [],
    subscribers: [],
    connectTimeout:5000,
    acquireTimeout:5000,
});

