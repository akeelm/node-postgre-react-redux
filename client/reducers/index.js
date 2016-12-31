import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user';

/*
import posts from './posts';
import comments from './comments';
import currentUser from './current-user.js';
*/



const rootReducer = combineReducers({
//  posts,
//  comments,
//  currentUser,
  user,
  routing: routerReducer
})

export default rootReducer;
