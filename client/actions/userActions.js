import fetch from 'isomorphic-fetch';
import * as authConstants from './../constants/auth';
import * as apiUtils from './../utils/api_utils';
import {reset} from 'redux-form';
import { push } from 'react-router-redux';
import User from './../../common/models/user';
import * as modelUtils from './../../common/models/utils';

//login
export function loginUser(email, password) {
  return (dispatch) => {
    return apiUtils.api_fetch(`${process.env.SERVER_URL}/api/user/login/`,
      JSON.stringify({email: email, password: password}),
      'post')
    .then(apiUtils.checkHttpStatus)
    .then(apiUtils.parseJSON)
    .then((response) => {
        dispatch(loginUserSuccess(email, response.token));
        dispatch(reset('loginForm'));
        setTimeout(() => {
          dispatch(push('/'));
        }, 2000);
    })
    .catch(error => {
      dispatch(loginUserFailure(error));
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
    return apiUtils.api_fetch(
      `${process.env.SERVER_URL}/api/user/register/`,
      JSON.stringify({firstname: firstname, surname: surname, email: email, password: password}),
      'post'
    )
    .then(apiUtils.checkHttpStatus)
    .then((response) => {
        dispatch(registerUserSuccess(response));
        dispatch(reset('registerForm'));
    })
    .catch(error => {
      dispatch(registerUserFailure(error));
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
    return apiUtils.api_fetch(
      `${process.env.SERVER_URL}/api/user/verifyemail/${code}/`
    )
    .then(apiUtils.checkHttpStatus)
    .then(response => {
        dispatch(verifyEmailSuccess());
        setTimeout(() => {
          dispatch(push('/'));
        }, 2000);
    })
    .catch(error => {
      dispatch(verifyEmailFailure(error));
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
    return apiUtils.api_fetch(`${process.env.SERVER_URL}/api/user/getFromToken/`,
      JSON.stringify({token: localStorage.getItem('token')}),
      'post')
    .then(apiUtils.checkHttpStatus)
    .then(apiUtils.parseJSON)
    .then(response => {
        dispatch(getFromTokenSuccess(response.token, response.user));
    })
    .catch(error => {
      dispatch(getFromTokenFailure(error));
    })
  }
}

export function getFromTokenSuccess(token, user) {
  return {
    type: authConstants.VALIDATE_USER_FROM_TOKEN_SUCCESS,
    payload: {
      status: 200,
      token: token,
      user: user
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
    return apiUtils.api_fetch(
      `${process.env.SERVER_URL}/api/user/update/`,
      JSON.stringify({ user: userModel, token: token }),
      'post'
    )
    .then(apiUtils.checkHttpStatus)
    .then(apiUtils.parseJSON)
    .then((response) => {
        localStorage.setItem('token', response.token);
        dispatch(updateUserSuccess(response));
        setTimeout(() => {
          //refresh user from token in localStorage
          dispatch(getFromToken());
        }, 2000);
        dispatch(reset('profileForm'));
    })
    .catch(error => {
      dispatch(updateUserFailure(error));
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

export function validateForgotPasswordCode(code) {
  return function(dispatch) {
    return apiUtils.api_fetch(
      `${process.env.SERVER_URL}/api/user/validateforgotpasswordcode/`,
      JSON.stringify({ code: code }),
      'post'
    )
    .then(apiUtils.checkHttpStatus)
    .then(apiUtils.parseJSON)
    .then(response => {
        dispatch(validateForgotPasswordCodeSuccess(response));
    })
    .catch(error => {
      dispatch(validateForgotPasswordCodeFailure(error));
    })

  }
}

export function validateForgotPasswordCodeSuccess(response) {
  return {
    type: authConstants.VALIDATE_FORGOT_PASSWORD_CODE_SUCCESS ,
    payload: {
      status: 200,
      statusText: "",
      userid: response.userid,
    }
  }
}

export function validateForgotPasswordCodeFailure(error) {
  return {
    type: authConstants.VALIDATE_FORGOT_PASSWORD_CODE_FAILURE  ,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}

export function forgotPassword(email) {
  return function(dispatch) {
    return apiUtils.api_fetch(
      `${process.env.SERVER_URL}/api/user/forgotpassword/`,
      JSON.stringify({ email: email }),
      'post'
    )
    .then(apiUtils.checkHttpStatus)
    .then(response => {
        dispatch(forgotPasswordSuccess());
        setTimeout(() => { dispatch(push('/')); }, 2000);
    })
    .catch(error => {
      dispatch(forgotPasswordFailure(error));
    })
  }
}

export function forgotPasswordSuccess(response) {
  return {
    type: authConstants.FORGOT_USER_PASSWORD_SUCCESS ,
    payload: {
      status: 200,
      statusText: "An e-mail has been sent with password reset instructions",
    }
  }
}

export function forgotPasswordFailure(error) {
  return {
    type: authConstants.FORGOT_USER_PASSWORD_FAILURE ,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}

export function resetPassword(code, values) {
  return function(dispatch) {
    apiUtils.api_fetch(
      `${process.env.SERVER_URL}/api/user/resetpassword/`,
      JSON.stringify({ code: code, password: values.password }),
      'post'
    )
    .then(apiUtils.checkHttpStatus)
    .then(response => {
        setTimeout(() => {
          dispatch(resetUserStatus());
          dispatch(push('/login/'));
        }, 2000);
    })
    .catch(error => {
      dispatch(resetPasswordFailure(error));
    })
  }
}

export function resetPasswordSuccess(response) {
  return {
    type: authConstants.RESET_PASSWORD_SUCCESS,
    payload: {
      status: 200,
      statusText: "Your password has been reset",
    }
  }
}

export function resetPasswordFailure(error) {
  return {
    type: authConstants.RESET_PASSWORD_FAILURE ,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}
