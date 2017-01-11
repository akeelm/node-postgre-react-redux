require('dotenv').config();

export default class VerifyEmailTemplate {
  constructor(to, verificationCode){
    this.to = to;
    this.verificationCode = verificationCode;
  }
  getSubject() {
    return 'Please verify your e-mail address';
  }
  getToAddress(){
    return this.to;
  }
  getTextTemplate() {
    return `You have registered to ${process.env.APP_NAME} with the e-mail address ${this.to}

    Before you can use your account, you need to verify it with the following link - ${process.env.SERVER_URL}/user/verify/${this.verificationCode}

    ${process.env.APP_NAME}`;
  }
  getHtmlTemplate() {
    return `<html>
      <head></head>
      <body>
        <p>You have registered to <b>${process.env.APP_NAME}</b> with the e-mail address <b>${this.to}</b></p>
        <p> Before you can use your account, you need to verify it with the following link - <a href='${process.env.SERVER_URL}/user/verify/${this.verificationCode}'>${process.env.SERVER_URL}/user/verify/${this.verificationCode}</a>
        <br>
        <p><b>${process.env.APP_NAME}<b/></p>
      </body>
    </html>`
  }
}
