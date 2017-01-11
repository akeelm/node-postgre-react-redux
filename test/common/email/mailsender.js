import MailSender from './../../../common/email/mailsender';
require('dotenv').config();

const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;

describe('MailSender', () => {
  it('should be able to send e-mail', (done) => {
    let _mailSender = new MailSender();
    _mailSender.sendMail(
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
});
