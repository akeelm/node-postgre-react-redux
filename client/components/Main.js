import React from 'react';
import { Link } from 'react-router';
import Login from './Login.js';
import styles from './../styles/site.scss';

const Main = React.createClass({
  render() {
    return (
      <div className="container">
        <div className="page-header">
          <div className="row">
            <div className="col-sm-6">
              <div className="bgred">
                <Login />
                <h1>
                  <Link to="/">node-postgre-react</Link>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

export default Main;
