const mysql = require('mysql2/promise')

const connection = mysql.createPool({
    host: process.env.HOST_DB,
    password: process.env.PASSWORD_DB,
    user: process.env.USER_DB,
    database: process.env.DATABASE,
    port: process.env.PORT_DB,
    waitForConnections: true,
})

module.exports = {
    connection
}
