const nodemailer = require("nodemailer");
require("dotenv").config();

// ✅ Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,          // Gmail address
    pass: process.env.USER_APP_PASSWORD,   // 🔐 App Password (NOT gmail password)
  },
});

// ✅ Optional but recommended: verify connection
// transporter.verify((error, success) => {
//   if (error) {
//     console.error("Email transporter error:", error);
//   } else {
//     console.log("Email server is ready to send messages");
//   }
// });

// ✅ Send OTP email
const sendMail = async (to, otp) => {
  try {
    await transporter.sendMail({
      from: `"LMS Support" <${process.env.USER_EMAIL}>`,
      to,
      subject: "Reset Your Password",
      html: `
        <div style="font-family: Arial, sans-serif">
          <h2>Password Reset</h2>
          <p>Your OTP for password reset is:</p>
          <h3>${otp}</h3>
          <p>This OTP expires in <b>5 minutes</b>.</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = sendMail;
