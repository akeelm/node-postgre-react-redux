require('dotenv').config()
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require(process.cwd() + '/server');
const should = chai.should();
chai.use(chaiHttp);
var agent = chai.request.agent(server);

describe('user register method', () => {
  it('should have a register post method', (done) => {
    chai.request(server)
    .post('/api/user/register')
    .end((err, res) => {
      res.should.have.status(401);
      done();
    });
  });
  it('should not allow duplicate emails', (done) => {
    chai.request(server)
    .post('/api/user/register')
    .send({ email: process.env.TEST_EMAIL,
      firstname: 'akeel',
      surname: 'mughal',
      password: process.env.TEST_PASSWORD
    })
    .end((err, res) => {
      res.should.have.status(401);
      done();
    });
  });
  it('should allow registration', (done) => {
    chai.request(server)
    .post('/api/user/register')
    .send({ email: 'akeelm@gmail.com',
      firstname: 'test',
      surname: 'test',
      password: 'password'
    })
    .end((err, res) => {
      res.should.have.status(200);
      done();
    });
  }).timeout(15000);
});

describe('email verified method', () => {
  it('should have method to verify email', (done) => {
    chai.request(server)
    .post('/api/user/verifyemail/argargarg223')
    .end((err, res) => {
      res.should.have.status(401);
      done();
    });
  });
});
// describe('user delete method', () => {
//   it('should allow deletion of user', (done) => {
//     chai.request(server)
//     .post('/api/user/delete')
//     .send({ email: 'test@hotmail.com' })
//     .end((err, res) => {
//       res.should.have.status(200);
//       done();
//     });
//   });
// });

describe('user login method', () => {
  it('should allow user login', (done) => {
    agent
    .post('/api/user/login')
    .send({ email: process.env.TEST_EMAIL, password: process.env.TEST_PASSWORD })
    .end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });
  it('should have a success route end point', (done) => {
    chai.request(server)
    .get('/api/user/loggedin')
    .end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });
});

describe('user get roles method', () => {
  it('should get user roles for userid', (done) => {
    agent
    .post('/api/user/roles')
    .send({ userid: 1 })
    .end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });
});
