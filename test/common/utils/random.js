import random from '../../../common/utils/random';
const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;

describe('random util', () => {
  it('should be able to generate random string', (done) => {
    const randomString = random.randomString(8);
    expect(randomString.length).to.be.equal(8);
    done();
  })
});
