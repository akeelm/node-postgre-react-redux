import React from 'react';
import { Link } from 'react-router';
import NavbarLoginRegister from './NavbarLoginRegister';
import NavbarLoggedIn from './NavbarLoggedIn';

class Navbar extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    const navbarClass = (this.props.location.pathname === "/") ?
    'navbar navbar-default navbar-fixed-top navbar-color-on-scroll navbar-transparent'
    :
    'navbar navbar-default navbar-fixed-top'
    return (
      <div>
        <nav className={navbarClass} id="sectionsNav">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navigation">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link className="navbar-brand" to={"/"}>node.js-PostgreSql-React</Link>
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
