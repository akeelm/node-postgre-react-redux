require('dotenv').config();

export default class PasswordResetTemplate {
  constructor(to, passwordResetCode){
    this.to = to;
    this.passwordResetCode = passwordResetCode;
  }
  getSubject() {
    return 'Password reset request';
  }
  getToAddress(){
    return this.to;
  }
  getTextTemplate() {
    return `You have requested to reset the password for ${process.env.APP_NAME} with the e-mail address ${this.to}

    To complete the password reset, you need to follow this link - ${process.env.SERVER_URL}/forgotpassword/${this.passwordResetCode}

    If you didn't request this password reset, then you can ignore this e-mail.

    ${process.env.APP_NAME}`;
  }
  getHtmlTemplate() {
    return `<html>
      <head></head>
      <body>
        <p>You have requested to reset the password for <b>${process.env.APP_NAME}</b> with the e-mail address <b>${this.to}</b></p>
        <p>To complete the password reset, you need to follow this link - <a href='${process.env.SERVER_URL}/forgotpassword/${this.passwordResetCode}'>${process.env.SERVER_URL}/forgotpassword/${this.passwordResetCode}</a>
        <br>
        <p><b>${process.env.APP_NAME}<b/></p>
      </body>
    </html>`
  }
}
