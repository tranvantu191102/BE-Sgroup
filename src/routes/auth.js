const router = require("express").Router();
const { validate } = require("../middlewares/validate");
const connection = require("../database/connection");
const crypto = require("crypto");
const { signAccessToken } = require("../helpers/jwt");
const { hashPassword, comparePassword } = require("../helpers/hashing");

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const queryGetUser = `select * from users where username=?`;
  // const user = users.find((el) => el.username === username);
  connection.query(queryGetUser, username, (err, result) => {
    if (err) {
      return res.status(400).json({
        message: "Error from server!",
      });
    }

    if (result.length === 0) {
      return res.status(400).json({
        message: "username or password is wrong!",
      });
    }
    // const {hashedPassword} = hashPassword(password)
    const { password: hashedPassword, salt } = result[0];
    if (comparePassword(password, salt, hashedPassword)) {
      const { password, ...user } = result[0];
      const payload = {
        username: user.username,
      };
      const accessToken = signAccessToken(payload);
      return res.status(200).json({
        data: user,
        accessToken,
      });
    }
  });
});

router.post("/register", [validate], (req, res) => {
  const { username, password, name, age, email, gender } = req.body;

  //   const user =  connection.query('SELECT * FROM users WHERE username=?', username,)
  const queryGetUser = `select * from users where username=?`;
  const queryInsertData = `INSERT INTO users(username,password,email,age,name,gender,salt) VALUES(?,?,?,?,?,?,?)`;
  // const user = users.find((el) => el.username === username);
  connection.query(queryGetUser, username, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "",
      });
    }

    if (result.length !== 0) {
      return res.status(400).json({
        message: "User exist!",
      });
    } else {
      //   console.log(result);
      const { hashedPassword, salt } = hashPassword(password);
      connection.query(
        queryInsertData,
        [username, hashedPassword, email, age, name, gender, salt],
        (err, data) => {
          if (err) {
            return res.status(400).json({
              message: "Register error",
            });
          }
          return res.status(200).json({
            data: data,
          });
        }
      );
    }
  });
});

module.exports = router;
