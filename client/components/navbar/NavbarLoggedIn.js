import React from 'react';
import { Link } from 'react-router';

export const NavbarLoginRegister = (props) => {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <Link to={"/profile/"}>Profile</Link>
        </li>
        <li>
          <Link to={"/logout/"}>Logout</Link>
        </li>
      </ul>
    )
};

export default NavbarLoginRegister;
