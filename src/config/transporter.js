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

export { transporter, createMailOptions };
