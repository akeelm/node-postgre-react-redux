import user from '../../../common/models/user.js';

const assert = require('assert');
const chai = require('chai');
const should = chai.should();

describe('user model class', () => {
  let userModel = new user(1, 'akeel', 'mughal', 'password', 'test@email.com', true);

  it('should have an id property', (done) => {
      should.exist(userModel.id);
      userModel.id.should.equal(1);
      done();
  });

  it('should have a createddate property', (done) => {
      should.exist(userModel.createddate);
      done();
  });

  it('should have a updateddate property', (done) => {
      should.exist(userModel.updateddate);
      done();
  });

  it('should have a firstname property', (done) => {
      should.exist(userModel.firstname);
      done();
  });

  it('should have a surname property', (done) => {
      should.exist(userModel.surname);
      done();
  });

  it('should have a password property', (done) => {
      should.exist(userModel.password);
      done();
  });

  it('should have a email property', (done) => {
      should.exist(userModel.email);
      done();
  });

  it('should have a emailverified property', (done) => {
      should.exist(userModel.emailverified);
      done();
  });
});
