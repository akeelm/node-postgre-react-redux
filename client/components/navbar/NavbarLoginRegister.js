import React from 'react';
import { Link } from 'react-router';

export const NavbarLoginRegister = (props) => {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <Link to={"/login/"}>Login</Link>
        </li>
        <li>
          <Link to={"/register/"}>Register</Link>
        </li>
      </ul>
    )
};

export default NavbarLoginRegister;
