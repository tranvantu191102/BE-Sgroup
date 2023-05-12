const router = require("express").Router();
const { validate } = require("../middlewares/validate");
const authControllers = require("../controllers/auth.controller");

router.post("/login", authControllers.handleLogin);
router.post("/register", [validate], authControllers.handleRegister);
router.post("/forgot-password", authControllers.handleForgotPassword);
router.post("/reset-password", authControllers.handleResetPassword);

module.exports = router;
