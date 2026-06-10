const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  try {
    console.log("Sending email to:", email);
    console.log("EMAIL_USER:", process.env.EMAIL_USER);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      connectionTimeout: 30000,
      greetingTimeout: 30000,
      socketTimeout: 30000,
    });

    await transporter.verify();
    console.log("SMTP Connected Successfully");

    const info = await transporter.sendMail({
      from: `"Go Dash Sports" <${process.env.EMAIL_USER}>`,
      to: email,
      subject,
      text,
    });

    console.log("Email sent successfully");
    console.log("Message ID:", info.messageId);
  } catch (error) {
    console.error("Email Error:", error);
  }
};

module.exports = sendEmail;