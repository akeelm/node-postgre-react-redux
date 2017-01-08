const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require(process.cwd() + '/server');
const should = chai.should();
require('dotenv').config()

chai.use(chaiHttp);

describe('server', ()=> {
  it('should run a server', (done) => {
    chai.request(server)
    .get('/')
    .end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });

  it('should have an api section', (done) => {
    chai.request(server)
    .get('/api/')
    .end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });
});

describe('api', () => {
  it('should have a user section', (done) => {
    chai.request(server)
    .get('/api/user')
    .end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });
});

describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', () => {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});
