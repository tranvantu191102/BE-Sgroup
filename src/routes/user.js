const router = require("express").Router();

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

router.get("/user", (req, res) => {
  res.status(200).json({
    data: dataUser,
  });
});

router.get("/user/:id", (req, res) => {
  const { id } = req.params;
  const user = dataUser.filter((item) => item.id === +id);
  res.status(200).json({
    data: user,
  });
});

router.put("/user/:id", (req, res) => {
  const { id } = req.params;
  const { fullname, gender, age } = req.body;

  if (!fullname || !gender || !age) {
    return res.json({
      message: "Missing input",
    });
  }

  for (let i = 0; i < dataUser.length; ++i) {
    if (dataUser[i].id === +id) {
      (dataUser[i].fullname = fullname),
        (dataUser[i].gender = gender),
        (dataUser[i].age = age);
      break;
    }
  }
  return res.status(200).json({
    message: dataUser,
  });
});

router.post("/user", (req, res) => {
  const data = req.body;
  if (!data.fullname || !data.gender || !data.age) {
    return res.json({
      message: "Missing input",
    });
  }
  const id = Math.floor(Math.random() * 100000);
  data.id = id;
  dataUser.push(data);

  res.status(201).json({
    data: data,
  });
});
router.delete("/user/:id", (req, res) => {
  const { id } = req.params;
  dataUser = dataUser.filter((item) => item.id !== +id);
  res.status(204);
});

module.exports = router;
