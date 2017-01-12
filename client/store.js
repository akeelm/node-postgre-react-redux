import { applyMiddleware, createStore, compose } from 'redux';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import rootReducer from "./reducers/baseReducer";
import thunk from 'redux-thunk';

const middleware = applyMiddleware(thunk, routerMiddleware(browserHistory));

let createStoreWithMiddleware = compose(
  middleware
)

export const store = createStoreWithMiddleware(createStore)(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const history =
  syncHistoryWithStore(browserHistory, store);

if (module.hot) {
  module.hot.accept('./reducers/baseReducer.js', () => {
    const nextRootReducer = require('./reducers/baseReducer.js').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
