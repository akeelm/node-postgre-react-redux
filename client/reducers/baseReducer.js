import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import user from './user';

const reducers = {
  user,
  routing: routerReducer,
  form: formReducer
}

const rootReducer = combineReducers(reducers);

export default rootReducer;
