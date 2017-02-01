//a reducer takes in two things:
//1. the action (info about what happened)
//2. copy of current state
import * as authConstants from './../constants/auth';
import {reducer as formReducer} from 'redux-form';

function createReducer(initialState, reducerMap) {
    return (state = initialState, action) => {
        const reducer = reducerMap[action.type];

        return reducer
            ? reducer(state, action.payload)
            : state;
    };
}

const initialState = {
    token: localStorage.getItem('token'),
    email: null,
    isAuthenticated: localStorage.getItem('token') ? true : false,
    isAuthenticating: false,
    status: null,
    statusText: null
};

export default createReducer(initialState, {
  [authConstants.LOGIN_USER]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticating': true,
      'statusText': null
    });
  },
  [authConstants.LOGIN_USER_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'isAuthenticated': true,
      'token': payload.token,
      'email': payload.email,
      'status': payload.status,
      'statusText': 'You have been successfully logged in.',
    });
  },
  [authConstants.LOGIN_USER_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'isAuthenticated': false,
      'token': null,
      'email': null,
      'status': payload.status,
      'statusText': `Authentication Error: ${payload.statusText}`
    });
  },
  [authConstants.LOGOUT_USER]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticated': false,
      'token': null,
      'email': null,
    });
  },
  [authConstants.REGISTER_USER_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      'status': payload.status,
      'statusText': `${payload.statusText}`
    });
  },
  [authConstants.REGISTER_USER_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      'status': payload.status,
      'statusText': `Registration failure: ${payload.statusText}`
    });
  },
  [authConstants.RESET_USER_STATUS]: (state, payload) => {
    return Object.assign({}, state, {
      'status': null,
      'statusText': null
    });
  },
  [authConstants.VERIFY_USER_EMAIL_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      'status': payload.status,
      'statusText': payload.statusText
    });
  },
  [authConstants.VERIFY_USER_EMAIL_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      'status': payload.status,
      'statusText': `Verification failure: ${payload.statusText}`
    });
  },
  [authConstants.VALIDATE_USER_FROM_TOKEN_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'isAuthenticated': true,
      'token': payload.token,
      'status': payload.status,
      'statusText': payload.statusText,
    },
    payload.user);
  },
  [authConstants.VALIDATE_USER_FROM_TOKEN_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'isAuthenticated': false,
      'token': null,
      'email': null,
      'status': payload.status,
    });
  },
  [authConstants.UPDATE_USER_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      'status': payload.status,
      'statusText': `${payload.statusText}`,
      'token': payload.token,
    }, payload.user);
  },
  [authConstants.UPDATE_USER_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      'status': payload.status,
      'statusText': `Update user failure: ${payload.statusText}`
    });
  },
  [authConstants.FORGOT_USER_PASSWORD_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      'status': payload.status,
      'statusText': `${payload.statusText}`
    });
  },
  [authConstants.FORGOT_USER_PASSWORD_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      'status': payload.status,
      'statusText': `Forgot password failure: ${payload.statusText}`
    });
  },
  [authConstants.VALIDATE_FORGOT_PASSWORD_CODE_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      'status': payload.status,
      'statusText': `${payload.statusText}`,
      'id': payload.userid,
    });
  },
  [authConstants.VALIDATE_FORGOT_PASSWORD_CODE_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      'status': payload.status,
      'statusText': `${payload.statusText}`
    });
  },
  [authConstants.RESET_PASSWORD_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      'status': payload.status,
      'statusText': `${payload.statusText}`,
    });
  },
  [authConstants.RESET_PASSWORD_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      'status': payload.status,
      'statusText': `${payload.statusText}`
    });
  },
});
