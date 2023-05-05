const authServices = require("../services/auth.service");

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: "Missing input!",
    });
  }

  const userData = await authServices.handleLogin(username, password);
  if (userData && userData?.statusCode === 500) {
    return res.status(500).json({
      message: userData.message,
    });
  }
  if (userData && userData?.statusCode === 400) {
    return res.status(400).json({
      message: userData.message,
    });
  }
  return res.status(200).json({
    data: userData,
  });
};
const handleRegister = async (req, res) => {
  const userData = await authServices.handleRegister(req.body);
  if (userData.statusCode === 500) {
    return res.status(500).json({
      message: userData.message,
    });
  }
  if (userData.statusCode === 400) {
    return res.status(400).json({
      message: userData.message,
    });
  }
  return res.status(200).json({
    data: userData,
  });
};

module.exports = { handleLogin, handleRegister };
