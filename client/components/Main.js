import React from 'react';
import { Link } from 'react-router';
import Login from './Login.js';

const Main = React.createClass({
  render() {
    return (
      <div>
        <Login />
        <h1>
          <Link to="/">Reduxstagram</Link>
        </h1>
      </div>
    )
  }
});

export default Main;
