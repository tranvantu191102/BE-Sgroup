const jwt = require("jsonwebtoken");
require("dotenv").config();

const signAccessToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
};

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
  signAccessToken,
  verifyAccessToken,
};
