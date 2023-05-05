const jwt = require("jsonwebtoken");
// const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
//   modulusLength: 2048,
// });

// const user = {
//   username: "a",
//   password: "123456",
//   email: "aaaa@gmail.com",
//   age: 18,
//   gender: "male",
// };
// const secret = "234567890";
// const payload = {
//   name: user.name,
//   email: user.email,
//   age: user.age,
//   gender: user.gender,
// };
// const options = {
//   algorithm: "HS256",
//   expiresIn: "1d",
//   issuer: "sgroup", // nguoi cap phat JWT
// };
// const jwtString = jwt.sign(payload, secret, options);
// const userToken =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFhYWFAZ21haWwuY29tIiwiYWdlIjoxOCwiZ2VuZGVyIjoibWFsZSIsImlhdCI6MTY4MTgyNDY2MCwiZXhwIjoxNjgxOTExMDYwLCJpc3MiOiJzZ3JvdXAifQ.GlUXbXxnUr4W5CVxuQvg3lhPzcLhyC1BBD6lqvfiYNk";
// console.log("JWT: ", jwtString);
// const isTokenValid = jwt.verify(userToken, secret);
// console.log("isTokenValid: ", isTokenValid);

// const signToken = () => {
//   jwt.sign(payload, secret, options, (err, results) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     return results;
//   });
// };

// const verifyToken = (req, res, next) => {
//     jwt.verify()
// }
const verifyAccessToken = (req, res, next) => {
  try {
    if (!req.headers["authorization"]) {
      return res.status(400).json({
        message: "Don't have token in header!",
      });
    }
    const token = req.headers["authorization"].split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
      if (err) {
        return res.status(400).json({
          message: "Unauthorized!",
        });
      }

      req.payload = payload;
      next();
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  verifyAccessToken,
};
