const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yiwei0318',
  database: 'study_with_me'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

module.exports = connection;