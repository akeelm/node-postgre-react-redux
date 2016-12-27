import React from 'react';
import { render } from 'react-dom';
require('./styles/site.scss');
import styles from './styles/site.scss';

//Import react router deps
import { Router, Route, IndexRoute, browserHistory }
  from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';

//Import components
import App from './components/App';

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
      </Route>
    </Router>
  </Provider>
)

render(router, document.getElementById('root'));
