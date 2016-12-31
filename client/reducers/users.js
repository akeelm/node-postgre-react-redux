//a reducer takes in two things:
//1. the action (info about what happened)
//2. copy of current state

// export function createReducer(initialState, reducerMap) {
//     return (state = initialState, action) => {
//         const reducer = reducerMap[action.type];
//
//         return reducer
//             ? reducer(state, action.payload)
//             : state;
//     };
// }

const initialState = {
    token: null,
    userName: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null
};

function posts(state = [], action) {
  switch (action.type) {
    case 'INCREMENT_LIKES':
      const i = action.index;
      console.log('Incrementing Likes!! ' + i);
      return [
        ...state.slice(0,i), //before the one we are updating
        {...state[i], likes: state[i].likes + 1},
        ...state.slice(i + 1), //after the one we are updating
      ]
    default:
      return state;
  }
}

export default posts;
