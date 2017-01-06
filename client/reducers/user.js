//a reducer takes in two things:
//1. the action (info about what happened)
//2. copy of current state
import * as authConstants from './../constants/auth';

function createReducer(initialState, reducerMap) {
    return (state = initialState, action) => {
        const reducer = reducerMap[action.type];

        return reducer
            ? reducer(state, action.payload)
            : state;
    };
}

const initialState = {
    token: null,
    email: null,
    isAuthenticated: false,
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
      'email': payload.username,
      'status': payload.status,
      'statusText': 'You have been successfully logged in.'
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
      'statusText': 'You have been successfully logged out.'
    });
  }
});

// function posts(state = [], action) {
//   switch (action.type) {
//     case 'INCREMENT_LIKES':
//       const i = action.index;
//       console.log('Incrementing Likes!! ' + i);
//       return [
//         ...state.slice(0,i), //before the one we are updating
//         {...state[i], likes: state[i].likes + 1},
//         ...state.slice(i + 1), //after the one we are updating
//       ]
//     default:
//       return state;
//   }
// }
