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

import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
const middleware = applyMiddleware(thunk);
import rootReducer from "./../../../client/reducers/baseReducer";
let createStoreWithMiddleware = compose(
  middleware
)

export const store = createStoreWithMiddleware(createStore)(
    rootReducer,
);

function configureStore(mocks) {
  return createStoreWithMiddleware(createStore)(
    rootReducer,
  );
}

describe('actions::userActions::loginUser', (done) => {
  it('should return LOGIN_USER_SUCCESS for a valid user', (done) => {
    actions.loginUser(process.env.TEST_EMAIL, process.env.TEST_PASSWORD)(configureStore)
    .then((result) => {
      expect(result.type).to.equal(authConstants.LOGIN_USER_SUCCESS);
      done();
    })
    .catch((e) => {
      expect(result.type).to.equal(authConstants.LOGIN_USER_FAILURE);
    });
  })

  it('should return LOGIN_USER_FAILURE for an invalid user', (done) => {
    actions.loginUser('invalid@hotmail.com', 'password')(configureStore)
    .then((result) => {
      expect(result.type).to.equal(authConstants.LOGIN_USER_FAILURE);
      done();
    })
    .catch((e) => {
      expect(e).to.equal(authConstants.LOGIN_USER_FAILURE);
      done();
    });
  })
});
