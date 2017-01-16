import React from 'react';
import { Link } from 'react-router';
import NavbarLoginRegister from './NavbarLoginRegister';
import NavbarLoggedIn from './NavbarLoggedIn';

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
            {
              //if logged in remove the "Login / Register" option
              (this.props.user.isAuthenticated) ?
              <NavbarLoggedIn {... {email: this.props.user.email}}/> :
              <NavbarLoginRegister />
            }
            </div>
          </div>
        </nav>
      </div>
    )
  }
};

export default Navbar;
