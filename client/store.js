import { applyMiddleware, createStore, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import rootReducer from "./reducers/index";
import thunk from 'redux-thunk';

//create an object for the default data
const defaultState = {
  //posts,
  //comments,
  //currentUser: undefined
};

const middleware = applyMiddleware(thunk);

let createStoreWithMiddleware = compose(
  middleware
)

export const store = createStoreWithMiddleware(createStore)(
    rootReducer,
    defaultState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const history =
  syncHistoryWithStore(browserHistory, store);

if (module.hot) {
  module.hot.accept('./reducers/', () => {
    const nextRootReducer = require('./reducers/index.js').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
