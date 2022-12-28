import "reflect-metadata"
import { DataSource } from "typeorm"
import { Member } from "./entity/Member"
require("dotenv").config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.HOST,
    port: 3306,
    username: process.env.USERSQLSERVER,
    password: process.env.PASSWORDSQLSERVER,
    database: process.env.DATABASE,
    synchronize: true,
    logging: true,
    entities: [Member],
    migrations: [],
    subscribers: [],
})
