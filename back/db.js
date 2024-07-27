var mysql = require('mysql');

// Create MySQL connection
var connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "system",
  password: "",   //user password
  database: "mms" 
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    throw err;
  }
  console.log('Connected to MySQL database');
});

module.exports = connection;