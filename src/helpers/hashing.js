const crypto = require("crypto");

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hashedPassword = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return { hashedPassword, salt };
}
function comparePassword(password, salt, hashedPassword) {
  const newHashedPassword = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return newHashedPassword === hashedPassword;
}

module.exports = { hashPassword, comparePassword };
