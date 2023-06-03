const router = require("express").Router();
const { validate } = require("../middlewares/validate");
const userControllers = require("../controllers/user.controller");
const { verifyAccessToken } = require("../middlewares/jwt");

router.post("/", [validate, verifyAccessToken], userControllers.createUser);
router.put("/:id", [verifyAccessToken], userControllers.updateUser);
router.delete("/:id", [verifyAccessToken], userControllers.deleteUser);
router.get("/", [verifyAccessToken], userControllers.getUsers);

module.exports = router;
