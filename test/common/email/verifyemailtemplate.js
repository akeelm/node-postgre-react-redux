require('dotenv').config();
import VerifyEmailTemplate from '../../../common/email/verifyemailtemplate';
import MailSender from './../../../common/email/mailsender';

const assert = require('assert');
const chai = require('chai');
const should = chai.should();

describe('VerifyEmailTemplate', () => {
  let verifyEmailTemplate;
	beforeEach(() => {
    verifyEmailTemplate = new VerifyEmailTemplate(process.env.TEST_EMAIL, 'xxflkkarg');
  });
  it('should be able to send e-mail', (done) => {
    let _mailSender = new MailSender();
    _mailSender.sendMail(
      verifyEmailTemplate.getToAddress(),
      verifyEmailTemplate.getSubject(),
      verifyEmailTemplate.getTextTemplate(),
      verifyEmailTemplate.getHtmlTemplate()
    )
    .then((result) => {
      expect(result.accepted).to.not.be.null;
      done();
    })
    .catch((e) => {
      throw e;
      done();
    })
  }).timeout(15000);
});
