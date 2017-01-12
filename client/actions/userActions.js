import fetch from 'isomorphic-fetch';
import * as authConstants from './../constants/auth';
import * as apiUtils from './../utils/api_utils';
import {reset} from 'redux-form';

//login
export function loginUser(email, password) {
  return function(dispatch) {
    //dispatch(loginUserRequest());
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
    //.then(parseJSON)
    .then(response => {
      try {
        dispatch(loginUserSuccess(email));
        dispatch(reset('loginForm'));
        return loginUserSuccess(email);
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

export function loginUserSuccess(email) {
  // localStorage.setItem('currentUser', email);
  return {
    type: authConstants.LOGIN_USER_SUCCESS,
    payload: {
      status: 200,
      email: email
    }
  }
}

export function loginUserFailure(error) {
  // localStorage.removeItem('currentUser');
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
    //.then(parseJSON)
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
