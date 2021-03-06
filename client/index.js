import React from 'react';
import { render } from 'react-dom';
import styles from './styles/site.scss';

//Import react router deps
import { Router, Route, IndexRoute, browserHistory }
  from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';

//Import components
import App from './components/App';
import Home from './components/Home';
import Register from './components/user/Register';
import Login from './components/user/Login';
import Logout from './components/user/Logout';
import VerifyEmail from './components/user/VerifyEmail';
import ProfileContainer from './components/user/ProfileContainer';
import ForgotPasswordContainer from './components/user/ForgotPasswordContainer';

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}></IndexRoute>
        <Route path="/register/" component={Register}></Route>
        <Route path="/login/" component={Login}></Route>
        <Route path="/logout/" component={Logout}></Route>
        <Route path="/user/verify/:code" component={VerifyEmail}></Route>
        <Route path="/profile/" component={ProfileContainer}></Route>
        <Route path="/forgotpassword/" component={ForgotPasswordContainer}></Route>
        <Route path="/forgotpassword/:code" component={ForgotPasswordContainer}></Route>
      </Route>
    </Router>
  </Provider>
)

render(router, document.getElementById('root'));
