const express = require("express");
const app = express();
const routes = require("./src/routes");

app.use(express.json());
app.use(express.urlencoded());
routes(app);

app.listen(8001, () => {
  console.log("running");
});
