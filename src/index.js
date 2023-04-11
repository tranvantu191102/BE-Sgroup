const express = require("express");
const app = express();
const routes = require("./routes");
const configDatabase = require("./config/db.config");
configDatabase();
app.use(express.json());
app.use(express.urlencoded());
routes(app);

app.listen(8001, () => {
  console.log("running");
});
