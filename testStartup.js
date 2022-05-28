require("dotenv").config();
const connectiontest = require("./connectionTest");
const mysql = require("mysql");
const { timeout } = require("cron");
const con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USERSQLSERVER,
  password: process.env.PASSWORDSQLSERVER,
  database: process.env.DATABASE,
  port: 3306,
  multipleStatements: true,
});
con.connect(function (err) {
  if (err) throw err;
  console.log("ID ", con.threadId);
});
con.ping(function (err) {
  if (err) throw err;
  console.log("pinged");
});
con.on("error", function (err) {
  console.log(err.code);
  console.log(err.fatal);
});
timeout("/5 * * * * *", () => {
  con.end(function (err) {
    if (err) console.log(err);
  });
});
