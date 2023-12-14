
const mysql =require('mysql2')

const mysqlPool = mysql.createPool({
    host:'localhost',
    user:'admin',
    password:'Test1234',
    database: 'employee_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0

})


module.exports = mysqlPool.promise();
