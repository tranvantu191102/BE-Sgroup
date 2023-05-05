const connection = require("../database/connection");
const { comparePassword, hashPassword } = require("../helpers/hashing");
const { signAccessToken } = require("../helpers/jwt");

const handleLogin = (username, password) =>
  new Promise((resolve, reject) => {
    try {
      const queryGetUser = `select * from users where username=?`;
      let userData = {};
      connection.query(queryGetUser, username, (err, result) => {
        if (err) {
          userData.statusCode = 500;
          userData.message = "Error from server!";
          return resolve(userData);
        }

        if (result.length === 0) {
          console.log(result);
          userData.statusCode = 400;
          userData.message = "username or password is wrong!";
          return resolve(userData);
        }
        // const {hashedPassword} = hashPassword(password)
        const { password: hashedPassword, salt } = result[0];
        if (comparePassword(password, salt, hashedPassword)) {
          const { password, ...user } = result[0];
          const payload = {
            username: user.username,
          };
          const accessToken = signAccessToken(payload);
          userData = { accessToken, ...user };
          return resolve(userData);
        }
      });
    } catch (error) {
      reject(error);
    }
  });

const handleRegister = (data) =>
  new Promise((resolve, reject) => {
    try {
      let userData = {};
      const queryGetUser = `select * from users where username=?`;
      const queryInsertData = `INSERT INTO users(username,password,email,age,name,gender,salt) VALUES(?,?,?,?,?,?,?)`;
      const { username, password, name, age, email, gender } = data;
      connection.query(queryGetUser, username, (err, result) => {
        if (err) {
          userData.statusCode = 500;
          userData.message = "Error from server!";
          return resolve(userData);
        }

        if (result.length !== 0) {
          userData.statusCode = 400;
          userData.message = "User exist!";
          return resolve(userData);
        } else {
          //   console.log(result);
          const { hashedPassword, salt } = hashPassword(password);
          connection.query(
            queryInsertData,
            [username, hashedPassword, email, age, name, gender, salt],
            (err, data) => {
              if (err) {
                userData.statusCode = 400;
                userData.message = "Register error";
                return resolve(userData);
              }
              userData.statusCode = 200;
              userData = { ...userData, ...data[0] };
              return resolve(userData);
            }
          );
        }
      });
    } catch (error) {
      reject(error);
    }
  });
module.exports = { handleLogin, handleRegister };
