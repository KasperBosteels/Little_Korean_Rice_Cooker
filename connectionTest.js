const database = require("./database.json");
const mysql = require('mysql');
const ms = require('ms');

module.exports = {
        execute(con){
        if(check(con)){
            return true;
        }else {
            return reconnect();
        }
    }
}
    function reconnect(){
    let recon = mysql.createConnection({
        host: database.host,
        user : database.user,
        password: database.pwd,
        database: database.database   
    });
    recon.connect(err => {
        if (check(recon)) {
            return true;
        } else {
            setTimeout(()=>{},ms('60s'))
            if(check(recon)){
                return true;
            }else {
                return errorHandler(err)
            }
        }
    })
}
function check(con){
    if(con.state == 'disconnected'){
        return false;
    }else {
        return true;
    }
}
function errorHandler(err){
    if(err){
    if(err.code == 'PROTOCOL_ENQUEUE_HANDSHAKE_TWICE'){return true;}
    else if(err.code == 'ECONNREFUSED'){console.log(err.code); return false;}
    else if(err.code == 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR'){console.log(err.code); return false;}
    }else {console.log('connection error, failed at reconnecting');return false;}
}