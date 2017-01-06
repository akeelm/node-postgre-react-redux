import fetch from 'isomorphic-fetch';
import * as authConstants from './../constants/auth';
import * as apiUtils from './../utils/api_utils';

//login
export function loginUser(email, password) {
  return function(dispatch) {
    //dispatch(loginUserRequest());
    return fetch('http://localhost:3000/api/user/login/', {
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
        //dispatch(pushState(null, redirect));
      } catch (e) {
        dispatch(loginUserFailure({
          response: {
            status: 403,
            statusText: 'Invalid token'
          }
        }));
      }
    })
    .catch(error => {
      dispatch(loginUserFailure(error));
    })
  }
}

export function loginUserSuccess(email) {
  localStorage.setItem('currentUser', email);
  return {
    type: authConstants.LOGIN_USER_SUCCESS,
    payload: {
      status: 200,
      email: email
    }
  }
}

export function loginUserFailure(error) {
  localStorage.removeItem('currentUser');
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
  return {
    type: authConstants.REGISTER_USER,
    firstname,
    surname,
    email,
    password
  }
}

//increment
export function increment(index) {
  return {
    type: 'INCREMENT_LIKES',
    index
  }
}

//add comment
export function addComment(postId, author, comment) {
  return {
    type: 'ADD_COMMENT',
    postId,
    author,
    comment
  }
}

//remove comment
export function removeComment(postId, i) {
  return {
    type: 'REMOVE_COMMENT',
    i,
    postId
  }
}
