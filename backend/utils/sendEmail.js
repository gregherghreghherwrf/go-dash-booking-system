const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  try {
    console.log("Sending email to:", email);
    console.log("EMAIL_USER:", process.env.EMAIL_USER);

    const transporter = nodemailer.createTransport({
      host: "74.125.24.109",
      port: 465,
      secure: true,
      family: 4,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        servername: "smtp.gmail.com",
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