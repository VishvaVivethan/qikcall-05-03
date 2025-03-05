const nodemailer = require("nodemailer");
const rateLimit = require("express-rate-limit");

const sendEmail = (body, message) => {
  const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    service: process.env.SERVICE,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  transporter.verify((err) => {
    if (err) {
      console.error("Error during SMTP verification:", err.message);
    } else {
      console.log("Server is ready to send emails");
    }
  });

  transporter.sendMail(body, (err) => {
    if (err) {
      console.error("Error during email sending:", err.message);
    } else {
      console.log(message);
    }
  });
};

// Rate limiting for email verification
const minutes = 5;
const emailVerificationLimit = rateLimit({
  windowMs: minutes * 60 * 1000,
  max: 5, 
  handler: (req, res) => {
    res.status(429).send({
      success: false,
      message: `You made too many requests. Please try again after ${minutes} minutes.`,
    });
  },
});

module.exports = { sendEmail, emailVerificationLimit };
