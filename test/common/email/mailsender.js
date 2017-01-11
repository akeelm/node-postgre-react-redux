require('dotenv').config();
import MailSender from './../../../common/email/mailsender';

const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;

describe('MailSender', () => {
  it('should be able to send e-mail', (done) => {
    MailSender.sendMail(
      process.env.TEST_EMAIL,
      'test subject',
      'hello world',
      '<b>hello world</b>'
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

  it('should be able to send verification e-mail', (done) => {
    MailSender.sendVerificationEmail(process.env.TEST_EMAIL, 'somecode112')
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
