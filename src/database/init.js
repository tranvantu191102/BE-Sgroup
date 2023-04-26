const connection = require("./connection");

// const query = `CREATE TABLE user (
//     user_id INT PRIMARY KEY,
//     fullname NVARCHAR(255),
//     gender BIT,
//     age INT CHECK (age > 0)
//   )`;

// const queryStudent = `CREATE TABLE Student (
//   id_student INT PRIMARY KEY AUTO_INCREMENT,
//   name NVARCHAR(255)
// )`;

// const queryCourse = `CREATE TABLE Course (
//   id_course INT PRIMARY KEY AUTO_INCREMENT,
//   name NVARCHAR(255),
// )`;

// const queryRegister = `CREATE TABLE Register (
//   id INT PRIMARY KEY AUTO_INCREMENT,
//   student NVARCHAR(255),
//   FOREIGN KEY (student) REFERENCES Student(id_student),
//   course NVARCHAR(255),
//   FOREIGN KEY (course) REFERENCES Course(id_course)
//   register_date DATE
// )`;

connection.query(query, function (error, results, fields) {
  if (error) throw error;
  console.log("Table created successfully");
});
