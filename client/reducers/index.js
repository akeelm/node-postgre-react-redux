import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import user from './user';

/*
import posts from './posts';
import comments from './comments';
import currentUser from './current-user.js';
*/

const reducers = {
  user,
  routing: routerReducer,
  form: formReducer
}

console.log(reducers);

const rootReducer = combineReducers(reducers);

export default rootReducer;
