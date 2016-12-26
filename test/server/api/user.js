const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require(process.cwd() + '/server/server');
const should = chai.should();
require('dotenv').config()
chai.use(chaiHttp);
var agent = chai.request.agent(server);

describe('user api', () => {
  it('should have a register post method', (done) => {
    chai.request(server)
    .post('/api/user/register')
    .end((err, res) => {
      res.should.have.status(401);
      done();
    });
  });
});

describe('user register method', () => {
  it('should not allow duplicate emails', (done) => {
    chai.request(server)
    .post('/api/user/register')
    .send({ email: 'akeelm_uk@hotmail.com',
      firstname: 'akeel',
      surname: 'mughal',
      password: 'password'
    })
    .end((err, res) => {
      res.should.have.status(401);
      done();
    });
  });
});

/*
  it('should allow registration', (done) => {
    chai.request(server)
    .post('/api/user/register')
    .send({ email: 'test@hotmail.com',
      firstname: 'test',
      surname: 'test',
      password: 'password'
    })
    .end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });
});

describe('user delete method', () => {
  it('should allow deletion of user', (done) => {
    chai.request(server)
    .post('/api/user/delete')
    .send({ email: 'test@hotmail.com' })
    .end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });
});
*/

describe('user login method', () => {
  it('should allow user login', (done) => {
    //chai.request(server)
    agent
    .post('/api/user/login')
    .send({ email: 'akeelm_uk@hotmail.com', password: 'password' })
    .end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });
});

describe('user get roles method', () => {
  it('should get user roles for userid', (done) => {
    //chai.request(server)
    agent
    .post('/api/user/roles')
    .send({ userid: 1 })
    .end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });
});
