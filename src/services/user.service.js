const { knexConnection } = require("../database/knex");
const { hashPassword } = require("../helpers/hashing");

const createUser = (data) =>
  new Promise((resolve, reject) => {
    try {
      let userData = {};
      const { username, password, name, age, email, gender, id } = data;

      knexConnection
        .select("*")
        .from("users")
        .where("username", username)
        .then((result) => {
          if (result.length !== 0) {
            userData.statusCode = 400;
            userData.message = "User exist!";
            return resolve(userData);
          } else {
            const { hashedPassword, salt } = hashPassword(password);

            user = {
              username,
              password: hashedPassword,
              email,
              age,
              name,
              gender,
              salt,
              createdAt: new Date(),
              createdBy: id,
            };
            knexConnection
              .insert(user)
              .into("users")
              .then((data) => {
                if (data.length === 0) {
                  userData.statusCode = 400;
                  userData.message = "Create user failed!";
                  return resolve(userData);
                }
                userData.statusCode = 200;
                userData = { ...userData, ...data[0] };
                return resolve(userData);
              });
          }
        });
    } catch (error) {
      reject(error);
    }
  });

const updateUser = (data) =>
  new Promise((resolve, reject) => {
    try {
      let userData = {};
      const { id, ...dataUpdate } = data;

      knexConnection
        .select("*")
        .from("users")
        .where("id", id)
        .then((userUpdate) => {
          if (!userUpdate) {
            userData.statusCode = 400;
            userData.message = "User not exist!";
            return resolve(userData);
          }

          knexConnection("users")
            .where("id", id)
            .update(dataUpdate)
            .then((results) => {
              if (!results) {
                userData.statusCode = 400;
                userData.message = "can not update user!";
                return resolve(userData);
              }

              userData.statusCode = 200;
              userData.message = "updated users";
              userData = { ...results, ...userData };
              return resolve(userData);
            });
        });
    } catch (error) {
      reject(error);
    }
  });

const deleteUser = (id) =>
  new Promise((resolve, reject) => {
    try {
      let userData = {};
      knexConnection("users")
        .where("id", id)
        .del()
        .then((user) => {
          if (!user) {
            userData.statusCode = 400;
            userData.message = "User not exist!";
            return resolve(userData);
          }

          userData.statusCode = 200;
          userData.message = "Deleted user!";
          return resolve(userData);
        });
    } catch (error) {
      reject(error);
    }
  });

const getUsers = ({ search, page, limitRow }) =>
  new Promise((resolve, reject) => {
    try {
      let userData = {};
      if (search) {
        knexConnection("users")
          .select("*")
          .whereRaw("`name` LIKE ? COLLATE utf8mb4_bin", [`%${search}%`])
          .then((data) => {
            if (!data) {
              userData.statusCode = 500;
              userData.message = "Error from server!";
              return resolve(userData);
            }

            if (data.length === 0) {
              userData.statusCode = 400;
              userData.message = "Not found!";
              return resolve(userData);
            }
            userData.statusCode = 200;
            userData.message = "Get users!";
            userData = { ...userData, data };
            return resolve(userData);
          });
      }

      if (page) {
        const pageOffset = page * limitRow;
        knexConnection("users")
          .select("*")
          .offset(pageOffset)
          .limit(limitRow)
          .then((data) => {
            if (!data) {
              userData.statusCode = 500;
              userData.message = "Error from server!";
              return resolve(userData);
            }

            if (data.length === 0) {
              userData.statusCode = 400;
              userData.message = "Not found!";
              return resolve(userData);
            }
            userData.statusCode = 200;
            userData.message = "Get users!";
            userData = { ...userData, data };
            return resolve(userData);
          });
      }
    } catch (error) {
      reject(error);
    }
  });

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
};
