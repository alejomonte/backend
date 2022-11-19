import mysql from "promise-mysql";
import config from "./../config";

const connection = mysql.createConnection({
    host: config.host,
    database: config.database,
    user: config.user,
    password: config.password
});

const getConnection = () => {
    return connection;
};
const myScape=(texto) =>{
    return mysql.scape(texto);
}

module.exports = {
    getConnection,
    myScape
};
