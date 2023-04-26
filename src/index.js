const express = require("express");
const app = express();
const routes = require("./routes");
const connection = require("./database/connection");
require("dotenv").config();

// console.log(process.env);

const PORT = process.env.PORT || 8001;
connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!!!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
routes(app);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
