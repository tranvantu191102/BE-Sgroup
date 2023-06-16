const userRouter = require("./user");
const authRouter = require("./auth");
const pollRouter = require("./poll");
const routes = (app) => {
  app.use("/user", userRouter);
  app.use("/auth", authRouter);
  app.use("/poll", pollRouter);
};

module.exports = routes;
