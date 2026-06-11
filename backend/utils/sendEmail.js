const brevo = require("@getbrevo/brevo");

const sendEmail = async (email, subject, text) => {
  try {
    const apiInstance = new brevo.TransactionalEmailsApi();

    apiInstance.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY
    );

    const sendSmtpEmail = {
      sender: {
        name: "Go Dash Sports",
        email: "harsh.khatri2105@gmail.com"
      },
      to: [
        {
          email: email
        }
      ],
      subject: subject,
      textContent: text
    };

    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("Email sent successfully");
    console.log(response);
  } catch (error) {
    console.error("Brevo Error:", error);
  }
};

module.exports = sendEmail;