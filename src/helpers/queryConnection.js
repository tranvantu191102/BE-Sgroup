const connection = require("../database/connection");

const queryDB = (query, data) =>
  new Promise((resolve, reject) => {
    try {
      connection.query(query, data, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    } catch (error) {
      throw new Error(error);
    }
  });

module.exports = { queryDB };
