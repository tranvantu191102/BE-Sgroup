const crypto = require("crypto");

function hashPassword(input) {
  const hashObject = crypto.createHash("sha512");
  const salt = crypto.randomBytes(16).toString("hex");
  console.log("salt: ", salt);
  //   const hashedPassword = hashObject.update(input + salt).digest("hex");
  const hashedPassword = crypto
    .pbkdf2Sync(input, salt, 1000, 64, "sha512")
    .toString("hex");
  return hashedPassword;
}

const iterations = 4;

for (let i = 0; i < iterations; ++i) {
  console.log(hashPassword("abcdefgh"));
}

// module.exports = {
//   hashPassword,
// };
