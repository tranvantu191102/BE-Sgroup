const mysql = require("mysql2");
const configDatabase = () => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "user",
  });

  connection.connect((err) => {
    if (!err) console.log("Database is connected!");
    else console.log(err);
  });
};

module.exports = configDatabase;
