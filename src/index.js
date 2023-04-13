const express = require("express");
const app = express();
const routes = require("./routes");
const connection = require("./database/connection");
require("dotenv").config();

const PORT = process.env.PORT || 8001;
connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!!!");
});

app.use(express.json());
app.use(express.urlencoded());
routes(app);

app.listen(PORT, () => {
  console.log("running");
});
