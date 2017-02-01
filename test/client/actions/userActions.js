require('dotenv').config();
import * as actions from './../../../client/actions/userActions';
import * as authConstants from './../../../client/constants/auth';
const assert = require('assert');
const chai = require('chai');
const should = chai.should();
const expect = chai.expect;

const chaiHttp = require('chai-http');
const server = require(process.cwd() + '/server');
require('dotenv').config()
chai.use(chaiHttp);
var agent = chai.request.agent(server);

import thunk from 'redux-thunk';
import rootReducer from "./../../../client/reducers/baseReducer";

import configureMockStore from 'redux-mock-store';
const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('actions::userActions::loginUser', (done) => {
  it('should return LOGIN_USER_SUCCESS for a valid user', (done) => {
    const store = mockStore({ users: [] });

    store.dispatch(actions.loginUser(process.env.TEST_EMAIL, process.env.TEST_PASSWORD))
    .then(() => {
      expect(store.getActions()[0].type).to.equal(authConstants.LOGIN_USER_SUCCESS);
      done();
    }).catch((err) => {
      expect(err.type).to.equal(authConstants.LOGIN_USER_FAILURE);
    });
  })

  it('should return LOGIN_USER_FAILURE for an invalid user', (done) => {
    const store = mockStore({ users: [] });

    store.dispatch(actions.loginUser('invalid@hotmail.com', 'password'))
    .then(() => {
      expect(store.getActions()[0].type).to.equal(authConstants.LOGIN_USER_FAILURE);
      done();
    })
    .catch((e) => {
      expect(e).to.equal(authConstants.LOGIN_USER_FAILURE);
      done();
    });
  })
});
