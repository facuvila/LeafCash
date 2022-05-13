/*export function transferir(idOrigen, idDestino, Monto) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
    host: "34.176.220.17",
    database : 's14_userData',
    user: "u14_uraglajxr0",
    password: "A1gQgdtLW.4EmljuueY+k69B"
    });

    connection.connect();

    let Query = "UPDATE Usuario SET balance = balance - "+Monto+" WHERE userId = '" + idOrigen + "'";
    connection.query(Query);

    Query = "UPDATE Usuario SET balance = balance + "+Monto+" WHERE userId = '" + idDestino + "'";
    connection.query(Query);

    connection.end();
}*/

export function getBalance(userId) { 
    var mysql = require('mysql');
    var connection = mysql.createConnection({
    host: "34.176.220.17",
    database : 's14_userData',
    user: "u14_uraglajxr0",
    password: "A1gQgdtLW.4EmljuueY+k69B"
    });

    connection.connect();

    let userBalance;
    let Query = "SELECT balance FROM Usuario WHERE userId='" + userId + "'";
    connection.query(Query, function (error, results, fields) {
        userBalance = results;
    });
    connection.end();
    return userBalance;
};
