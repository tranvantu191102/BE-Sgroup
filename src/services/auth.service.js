const connection = require("../database/connection");
const { comparePassword, hashPassword } = require("../helpers/hashing");
const { signAccessToken } = require("../helpers/jwt");
const { queryDB } = require("../helpers/queryConnection");

const handleLogin = (username, password) =>
  new Promise(async (resolve, reject) => {
    try {
      const queryGetUser = `select * from users where username=?`;
      let userData = {};
      const result = await queryDB(queryGetUser, username);
      if (result.length === 0) {
        userData.statusCode = 400;
        userData.message = "username not exist!";
        return resolve(userData);
      }
      const { password: hashedPassword, salt } = result[0];
      if (comparePassword(password, salt, hashedPassword)) {
        const { password, ...user } = result[0];
        const payload = {
          username: user.username,
        };
        const accessToken = signAccessToken(payload);
        userData = { accessToken, ...user };
        return resolve(userData);
      } else {
        userData.statusCode = 400;
        userData.message = "password is wrong!";
        return resolve(userData);
      }
    } catch (error) {
      reject(error);
    }
  });

const handleRegister = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      const queryGetUser = `select * from users where username=?`;
      const queryInsertData = `INSERT INTO users(username,password,email,age,name,gender,salt) VALUES(?,?,?,?,?,?,?)`;
      const { username, password, name, age, email, gender } = data;
      const result = await queryDB(queryGetUser, username);
      if (result.length !== 0) {
        userData.statusCode = 400;
        userData.message = "User exist!";
        return resolve(userData);
      } else {
        //   console.log(result);
        const { hashedPassword, salt } = hashPassword(password);
        const data = queryDB(queryInsertData, [
          username,
          hashedPassword,
          email,
          age,
          name,
          gender,
          salt,
        ]);
        if (data.length === 0) {
          userData.statusCode = 400;
          userData.message = "Create user failed!";
          return resolve(userData);
        }
        userData.statusCode = 200;
        userData = { ...userData, ...data[0] };
        return resolve(userData);
      }
    } catch (error) {
      reject(error);
    }
  });

const handleForgotPassword = (emailTo) =>
  new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      const queryGetUser = `select * from users where email=?`;
      const result = await queryDB(queryGetUser, emailTo);
      if (result.length === 0) {
        userData.statusCode = 400;
        userData.message = "User not exist!";
        return resolve(userData);
      } else {
        const randomToken =
          Math.floor(Math.random() * 100000000) + "asdhajsdhshda";
        const passwordResetExpiration = new Date(Date.now() + 10 * 60 * 1000);
        const queryInsertToken = `UPDATE users  SET passwordResetToken=?,passwordResetExpiration =? WHERE email=?`;
        const user = await queryDB(queryInsertToken, [
          randomToken,
          passwordResetExpiration,
          emailTo,
        ]);
        if (user.length !== 0) {
          userData.statusCode === 200;
          userData = {
            ...userData,
            randomToken,
            passwordResetExpiration,
          };
          return resolve(userData);
        } else {
          userData.statusCode = 400;
          userData.message = "Update user failed!";
        }
      }
    } catch (error) {
      reject(error);
    }
  });

const handleResetPassword = (email, passwordResetToken, newPassword) =>
  new Promise((resolve, reject) => {
    try {
      let userData = {};
      const querySelectUser =
        "SELECT * FROM users WHERE email = ? AND passwordResetToken = ? AND passwordResetExpiration >= ?";
      const user = queryDB(querySelectUser, [
        email,
        passwordResetToken,
        new Date(),
      ]);
      if (user.length === 0) {
        userData.statusCode = 400;
        userData.message = "email or reset token incorrect!";
        return resolve(userData);
      }
      const queryUpdateUser =
        "UPDATE users SET password = ?, salt = ?, passwordResetToken = null, passwordResetExpiration = null, passwordLastResetDate = ? WHERE email = ?";
      const { hashedPassword, salt } = hashPassword(newPassword);

      const userUpdated = queryDB(queryUpdateUser, [
        hashedPassword,
        salt,
        new Date(),
        email,
      ]);
      if (userUpdated.length === 0) {
        userData.statusCode = 400;
        userData.message = "User update failed!";
        return resolve(userData);
      }

      userData.statusCode = 200;
      userData.message = "Password is changed";
      return resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
module.exports = {
  handleLogin,
  handleRegister,
  handleForgotPassword,
  handleResetPassword,
};
