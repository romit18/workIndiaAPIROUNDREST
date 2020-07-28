const mysql = require("mysql");
require('dotenv').config();
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Romits1234@',
    database: 'todoDB',
    port: 3000,
    dateStrings: 'date'
});

connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

module.exports = connection;