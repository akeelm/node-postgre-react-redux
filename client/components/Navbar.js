import React from 'react';
import { Link } from 'react-router';

class Navbar extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top navbar-color-on-scroll navbar-transparent" id="sectionsNav">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navigation">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand">node.js-PostgreSql-React</a>
            </div>
            <div className="collapse navbar-collapse" id="navigation">
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <Link to={"/login/"}>Login</Link>
                </li>
                <li>
                  <Link to={"/register/"}>Register</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }
};

export default Navbar;
