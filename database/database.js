const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: process.env.host,
    user: process.env.user,
    database: process.env.database
});



module.exports = {
    connection
}
