const authServices = require("../services/auth.service");
const { mailService } = require("../services/mail.service");

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
const handleForgotPassword = async (req, res) => {
  try {
    const { emailTo, emailSubject, emailText } = req.body;
    // console.log({ emailFrom, emailTo, emailSubject, emailText });
    const userData = await authServices.handleForgotPassword(emailTo);
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
    const { randomToken } = userData;
    await mailService.sendEmail({
      emailTo,
      emailSubject,
      emailText,
      randomToken,
    });
    res.status(200).json({
      message: "Send mail success",
    });
  } catch (error) {}
};

const handleResetPassword = async (req, res) => {
  try {
    const { email, passwordResetToken, newPassword } = req.body;
    const userData = await authServices.handleResetPassword(
      email,
      passwordResetToken,
      newPassword
    );

    return res.status(userData.statusCode).json({
      message: userData.message,
    });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  handleLogin,
  handleRegister,
  handleForgotPassword,
  handleResetPassword,
};
