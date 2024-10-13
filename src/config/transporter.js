import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASS,
  },
});

const createMailOptions = (email, fullName) => {
  return {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: "Register successfully",
    text: `Hello ${fullName},\n\nYou have successfully registered an account on our website.`,
  };
};

const createMailForgotPassword = (email, randomCode) => {
  return {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: "Code reset password",
    // text: "System has received a request to reset the password of your account. If you are not the one who requested, please ignore this email. Otherwise, please use the following code to reset your password",
    html: `<h1>${randomCode}</h1>`,
    // just use text or html, not both
  };
};

export { transporter, createMailOptions, createMailForgotPassword };
