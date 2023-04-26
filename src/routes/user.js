const router = require("express").Router();
const { validate } = require("../middlewares/validate");
const connection = require("../database/connection");
const { verifyAccessToken } = require("../helpers/jwt");

router.get("/", verifyAccessToken, (req, res) => {
  connection.query("SELECT * FROM users", (err, results) => {
    return res.status(200).json({
      data: results,
    });
  });
});

// router.get("/:id", (req, res) => {
//   const { id } = req.params;
//   const query = `select * from user where user_id=${+id};`;
//   connection.query(query, (err, results) => {
//     return res.status(200).json({
//       data: results,
//     });
//   });
// });

router.put("/:id", verifyAccessToken, validate, (req, res) => {
  const { id } = req.params;
  const { username } = req.payload;
  const { name, age, gender } = req.body;

  connection.query(
    "SELECT username FROM users WHERE id=?",
    id,
    (err, result) => {
      if (err) {
        return res.status(400).json({
          message: "Error from server!",
        });
      }
      if (result[0].username !== username) {
        return res.status(400).json({
          message: "Token is not valid!",
        });
      }

      connection.query(
        "UPDATE users SET name=?, gender=?, age=? where username=?",
        [name, gender, age, username],
        (err, updated) => {
          if (err) {
            return res.status(400).json({
              message: "Error from server!",
            });
          }
          return res.status(200).json({
            message: "Updated user!",
            data: updated[0],
          });
        }
      );
    }
  );
});

// router.post("/", validate, (req, res) => {
//   const { fullname, age, gender } = req.body;
//   const id = Math.floor(Math.random() * 100000000);

//   connection.query(
//     `select * from user where user_id=${+id};`,
//     (err, result) => {
//       if (Object.keys(result).length === 0) {
//         connection.query(
//           "INSERT INTO user(user_id,fullname, gender, age) VALUES(?,?,?,?)",
//           [id, fullname, +gender, age],
//           (err, results) => {
//             if (err) {
//               console.log(err);
//               return;
//             }

//             return res.status(201).json({
//               message: "Created user",
//             });
//           }
//         );
//       } else {
//         return res.status(400).json({
//           message: "User exist",
//         });
//       }
//     }
//   );
// });
// router.delete("/:id", (req, res) => {
//   const { id } = req.params;

//   const query = `delete from user where user_id=?;`;
//   connection.query(query, [id], (err, results) => {
//     return res.status(200);
//   });
// });

module.exports = router;
