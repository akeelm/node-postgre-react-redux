import base from '../../../common/models/base.js';

const assert = require('assert');
const chai = require('chai');
const should = chai.should();

describe('base model class', () => {
  it('should have an id property', (done) => {
      let baseClass = new base(1);
      should.exist(baseClass.id);
      baseClass.id.should.equal(1);
      done();
  });

  it('should have a createddate property', (done) => {
      let baseClass = new base(1);
      should.exist(baseClass.createddate);
      done();
  });

  it('should have a updateddate property', (done) => {
      let baseClass = new base(1);
      should.exist(baseClass.updateddate);
      done();
  });
});
