const router = require("express").Router();
const { validate } = require("../middlewares/validate");
const connection = require("../database/connection");
const { v4: uuidv4 } = require("uuid");

let dataUser = [
  {
    id: 1,
    fullname: "Nguyen Huy Tuong",
    gender: true,
    age: 18,
  },
  {
    id: 2,
    fullname: "Nguyen Thi Tuong",
    gender: false,
    age: 15,
  },
];

router.get("/", (req, res) => {
  connection.query("select * from user", (err, results) => {
    return res.status(200).json({
      data: results,
    });
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const query = `select * from user where user_id=${+id};`;
  connection.query(query, (err, results) => {
    return res.status(200).json({
      data: results,
    });
  });
});

router.put("/:id", validate, (req, res) => {
  const { id } = req.params;
  const { fullname, gender, age } = req.body;

  const query = `update user set fullname=?, gender=?, age=? where user_id=${+id};`;
  connection.query(query, [fullname, +gender, +age], (err, results) => {
    return res.status(200).json({
      data: results,
    });
  });
});

router.post("/", validate, (req, res) => {
  const { fullname, age, gender } = req.body;
  const id = Math.floor(Math.random() * 100000000);

  connection.query(
    `select * from user where user_id=${+id};`,
    (err, result) => {
      if (Object.keys(result).length === 0) {
        connection.query(
          "INSERT INTO user(user_id,fullname, gender, age) VALUES(?,?,?,?)",
          [id, fullname, +gender, age],
          (err, results) => {
            if (err) {
              console.log(err);
              return;
            }

            return res.status(201).json({
              message: "Created user",
            });
          }
        );
      } else {
        return res.status(400).json({
          message: "User exist",
        });
      }
    }
  );
});
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const query = `delete from user where user_id=${+id};`;
  connection.query(query, (err, results) => {
    return res.status(200);
  });
});

module.exports = router;
