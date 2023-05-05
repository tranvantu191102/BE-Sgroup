const jwt = require("jsonwebtoken");
require("dotenv").config();

const signAccessToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
};

module.exports = {
  signAccessToken,
};
