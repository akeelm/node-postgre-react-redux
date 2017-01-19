import fetch from 'isomorphic-fetch';
import * as authConstants from './../constants/auth';
import * as apiUtils from './../utils/api_utils';
import {reset} from 'redux-form';
import { push } from 'react-router-redux';
import User from './../../common/models/user';
import * as modelUtils from './../../common/models/utils';

//login
export function loginUser(email, password) {
  return function(dispatch) {
    return fetch(`${process.env.SERVER_URL}/api/user/login/`, {
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: email, password: password})
    })
    .then(apiUtils.checkHttpStatus)
    .then(apiUtils.parseJSON)
    .then((response) => {
      try {
        dispatch(loginUserSuccess(email, response.token));
        dispatch(reset('loginForm'));
        setTimeout(() => {
          dispatch(push('/'));
        }, 2000);
        return loginUserSuccess(email, response.token);
      } catch (error) {
        dispatch(
          loginUserFailure({
            response: {
              status: 403,
              statusText: error
            }
          })
        );
        return loginUserFailure({
          response: {
            status: 403,
            statusText: error
          }
        });
      }
    })
    .catch(error => {
      dispatch(loginUserFailure(error));
      return loginUserFailure(error);
    })
  }
}

export function loginUserSuccess(email, token) {
  localStorage.setItem('token', token);
  return {
    type: authConstants.LOGIN_USER_SUCCESS,
    payload: {
      status: 200,
      email: email,
      token: token
    }
  }
}

export function loginUserFailure(error) {
  return {
    type: authConstants.LOGIN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}

//register
export function registerUser(firstname, surname, email, password) {
  return (dispatch) => {
    return fetch(`${process.env.SERVER_URL}/api/user/register/`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({firstname: firstname, surname: surname, email: email, password: password})
    })
    .then(apiUtils.checkHttpStatus)
    .then((response) => {
      try {
        dispatch(registerUserSuccess(response));
        dispatch(reset('registerForm'));
        return registerUserSuccess(response);
      }
      catch (error) {
        dispatch(
          registerUserFailure({
            response: {
              status: 403,
              statusText: error
            }
          })
        );
        return registerUserFailure({
          response: {
            status: 403,
            statusText: error
          }
        })
      }
    })
    .catch(error => {
      dispatch(registerUserFailure(error));
      return registerUserFailure(error);
    })
  }
}

export function registerUserSuccess(user) {
  return {
    type: authConstants.REGISTER_USER_SUCCESS,
    payload: {
      status: 200,
      statusText: "You have successfully registered your account. Please check your e-mail to complete the verification step.",
      user: user
    }
  }
}

export function registerUserFailure(error) {
  return {
    type: authConstants.REGISTER_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}

export function resetUserStatus() {
  return {
    type: authConstants.RESET_USER_STATUS
  }
}

export function validateUserEmail(code) {
  return function(dispatch) {
    return fetch(`${process.env.SERVER_URL}/api/user/verifyemail/${code}/`, {
      method: 'get',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(apiUtils.checkHttpStatus)
    .then(response => {
      try {
        dispatch(verifyEmailSuccess());
        setTimeout(() => {
          dispatch(push('/'));
        }, 2000);
        return verifyEmailSuccess();
      } catch (error) {
        dispatch(
          verifyEmailFailure({
            response: {
              status: 403,
              statusText: error
            }
          })
        );
        return verifyEmailFailure({
          response: {
            status: 403,
            statusText: error
          }
        });
      }
    })
    .catch(error => {
      dispatch(verifyEmailFailure(error));
      return verifyEmailFailure(error);
    })
  }
}

export function verifyEmailSuccess() {
  return {
    type: authConstants.VERIFY_USER_EMAIL_SUCCESS,
    payload: {
      status: 200,
      statusText: "Thank you for verifying your account."
    }
  }
}

export function verifyEmailFailure(error) {
  return {
    type: authConstants.VERIFY_USER_EMAIL_SUCCESS,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}

export function getFromToken() {
  return function(dispatch) {
    return fetch(`${process.env.SERVER_URL}/api/user/getFromToken/`, {
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({token: localStorage.getItem('token')})
    })
    .then(apiUtils.checkHttpStatus)
    .then(apiUtils.parseJSON)
    .then(response => {
      try {
        dispatch(getFromTokenSuccess(response.token, response.user));
        return getFromTokenSuccess(response.token, response.user);
      } catch (error) {
        dispatch(
          getFromTokenFailure({
            response: {
              status: 403,
              statusText: error
            }
          })
        );
        return getFromTokenFailure({
          response: {
            status: 403,
            statusText: error
          }
        });
      }
    })
    .catch(error => {
      dispatch(getFromTokenFailure(error));
      return getFromTokenFailure(error);
    })
  }
}

export function getFromTokenSuccess(token, user) {
  return {
    type: authConstants.VALIDATE_USER_FROM_TOKEN_SUCCESS,
    payload: {
      status: 200,
      token: token,
      id: user.id,
      firstname: user.firstname,
      surname: user.surname,
      email: user.email,
      emailverified: user.emailverified,
      roles: user.roles
    }
  }
}

export function getFromTokenFailure(error) {
  return {
    type: authConstants.VALIDATE_USER_FROM_TOKEN_FAILURE,
    payload: {
      status: error.response.status,
    }
  }
}

export function logoutUser() {
  return function(dispatch) {
    localStorage.setItem('token', null);
    dispatch(push('/'));
    dispatch(logoutUserSuccess());
    return logoutUserSuccess();
  }
}

export function logoutUserSuccess() {
  return {
    type: authConstants.LOGOUT_USER,
    payload: {
      status: 200,
      email: null,
      token: null,
      emailverified: null
    }
  }

}

export function updateUser(token, user) {
  //clean up the model for submission
  let destinationUser = new User();
  delete destinationUser.emailverified;
  let userModel = modelUtils.cleanAndMapModel(user, destinationUser);

  return (dispatch) => {
    return fetch(`${process.env.SERVER_URL}/api/user/update/`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user: userModel, token: token })
    })
    .then(apiUtils.checkHttpStatus)
    .then(apiUtils.parseJSON)
    .then((response) => {
      try {
        localStorage.setItem('token', response.token);
        dispatch(updateUserSuccess(response));
        setTimeout(() => {
          //refresh user from token in localStorage
          dispatch(getFromToken());
        }, 2000);
        dispatch(reset('profileForm'));
        return updateUserSuccess(response);
      }
      catch (error) {
        dispatch(
          updateUserFailure({
            response: {
              status: 403,
              statusText: error
            }
          })
        );
        return updateUserFailure({
          response: {
            status: 403,
            statusText: error
          }
        })
      }
    })
    .catch(error => {
      dispatch(updateUserFailure(error));
      return updateUserFailure(error);
    })
  }
}

export function updateUserSuccess(response) {
  return {
    type: authConstants.UPDATE_USER_SUCCESS,
    payload: {
      status: 200,
      statusText: "User updated",
      user: response.user,
      token: response.token
    }
  }
}

export function updateUserFailure(error) {
  return {
    type: authConstants.UPDATE_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}
