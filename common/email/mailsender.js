const nodemailer = require('nodemailer');
require('dotenv').config();

export default class MailSender {
  transporter() {
    return nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  sendMail(to, subject, textMessage, htmlMessage) {
    let mailOptions = {
      from: `"node-postgre-react" <${process.env.TEST_EMAIL}>`,
      to: to,
      subject: subject,
      text: textMessage,
      html: htmlMessage
    }

    return this.transporter().sendMail(mailOptions);
  }
}
