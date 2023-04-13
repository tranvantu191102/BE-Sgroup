const connection = require("./connection");

const query = `CREATE TABLE user (
    user_id INT PRIMARY KEY,
    fullname NVARCHAR(255),
    gender BIT,
    age INT CHECK (age > 0)
  )`;

connection.query(query, function (error, results, fields) {
  if (error) throw error;
  console.log("Table created successfully");
});
