const nodemailer = require("nodemailer");
// require("dotenv").config();

const mailService = {
  async sendEmail({ emailTo, emailSubject, emailText, randomToken }) {
    // console.log({
    //   host: process.env.SMTP_HOST,
    //   port: process.env.SMTP_PORT,
    //   auth: {
    //     user: process.env.SMTP_USER,
    //     pass: process.env.SMTP_PASS,
    //   },
    // });
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    const htmlEmail = `
    <h3>Reset Your Password</h3>
    <p>Click the following link to reset your password:</p>
    <a href="http://example.com/reset?token=${randomToken}">Reset Password</a>
    <p>Token is: ${randomToken}</p>
  `;
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: emailTo,
      subject: emailSubject,
      text: emailText,
      html: htmlEmail,
      // htmlEmail: htmlEmail
    });
  },
};

Object.freeze(mailService);

module.exports = {
  mailService,
};
