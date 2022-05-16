function getBalance(id) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: "34.176.220.17",
        database : 's14_userData',
        user: "u14_uraglajxr0",
        password: "A1gQgdtLW.4EmljuueY+k69B"
    });

    const getData = async() => {
        connection.connect();
        let userBalance = await returnBalance();
        connection.end();
        return userBalance;
    };
      
    function returnBalance() {
        return new Promise((resolve, reject) => {
            connection.query(
                "SELECT balance FROM Usuario WHERE userId='facuvila'",
                (err, result) => {
                    return err ? reject(err) : resolve(result[0].balance);
                }
            );
        });
    }

    return getData(); //Si bien esto no está funcionando, la idea es que espere a getData y reciba lo que esta devuelve (userBalance).

};

console.log(getBalance());
//Y, al loguear en la consola el valor devuelto por getBalance, esperamos recibir el balance del usuario 'facuvila'. Sin embargo, recibimos "Promise { <pending>}"