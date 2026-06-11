const axios = require("axios");

const sendEmail = async (email, subject, text) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Go Dash Sports",
          email: "harsh.khatri2105@gmail.com",
        },
        to: [
          {
            email: email,
          },
        ],
        subject: subject,
        textContent: text,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Email sent successfully");
    console.log(response.data);
  } catch (error) {
    console.error(
      "Brevo Error:",
      error.response?.data || error.message
    );
  }
};

module.exports = sendEmail;