const userRouter = require("./user");
const routes = (app) => {
  app.use(userRouter);
};

module.exports = routes;
