import emailverification from '../../../common/models/emailverification.js';

const assert = require('assert');
const chai = require('chai');
const should = chai.should();

describe('emailverification model class', () => {
  let emailverificationModel = new emailverification(1, 'XDCDA12', 1);

  it('should have an id property', (done) => {
      should.exist(emailverificationModel.id);
      emailverificationModel.id.should.equal(1);
      done();
  });

  it('should have a createddate property', (done) => {
      should.exist(emailverificationModel.createddate);
      done();
  });

  it('should have a updateddate property', (done) => {
      should.exist(emailverificationModel.updateddate);
      done();
  });

  it('should have a code property', (done) => {
      should.exist(emailverificationModel.code);
      done();
  });

  it('should have a userid property', (done) => {
      should.exist(emailverificationModel.userid);
      done();
  });
});
