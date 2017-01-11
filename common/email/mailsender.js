const nodemailer = require('nodemailer');
import VerifyEmailTemplate from './verifyemailtemplate';
require('dotenv').config();

class MailSender {
  static transporter() {
    return nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  static sendMail(to, subject, textMessage, htmlMessage) {
    let mailOptions = {
      from: `"node-postgre-react" <${process.env.TEST_EMAIL}>`,
      to: to,
      subject: subject,
      text: textMessage,
      html: htmlMessage
    }

    return this.transporter().sendMail(mailOptions);
  }

  static sendVerificationEmail(to, verificationCode) {
      let verifyEmailTemplate = new VerifyEmailTemplate(to, verificationCode);
      return this.sendMail(
        verifyEmailTemplate.getToAddress(),
        verifyEmailTemplate.getSubject(),
        verifyEmailTemplate.getTextTemplate(),
        verifyEmailTemplate.getHtmlTemplate()
      );
  }
}
export default MailSender;
