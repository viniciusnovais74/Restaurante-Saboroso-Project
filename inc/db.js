const mysql = require('mysql2');

const connection = mysql.createConnection({

    host: 'locahost',
    user: 'user',
    database: 'saboroso',
    password:' password'
})

module.exports = connection;