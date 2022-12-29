require("reflect-metadata");
const DataSource = require ("typeorm");
const Member = require ("./entity/Member");
const Guild = require ("./entity/guild");
const Message = require ("./entity/Message");
const Playlist =require( "./entity/Playlist");
const Profanity = require ("./entity/Profanity");
const Social_credit = require ("./entity/Social_credit");
const Swearword = require ("./entity/Swearword");
const Warning = require ("./entity/Warning");

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

