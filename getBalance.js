export default async function getBalance(userId) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: "34.176.220.17",
        database: 's14_userData',
        user: "u14_uraglajxr0",
        password: "A1gQgdtLW.4EmljuueY+k69B"
    });

    const getData = async () => {
        connection.connect();
        let userBalance = await returnBalance();
        connection.end();
        return userBalance;
    };

    function returnBalance() {
        return new Promise((resolve, reject) => {
            connection.query(
                "SELECT balance FROM Usuario WHERE userId='facuvila'",
                (error, result) => {
                    return error ? reject(error) : resolve(result[0].balance);
                }
            );
        });
    }

    return await getBalance();
    //console.log(await getData());
};