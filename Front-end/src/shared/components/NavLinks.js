import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../shared/context/AuthContext';

import './NavLinks.css';

const NavLinks = () => {
  const auth = useContext(AuthContext);

  const logOut = () => {
    auth.logout();
  };
  return (
    <span className="nav-links">
      {auth.isLogged && (
        <li>
          <NavLink to="/" exact>
            NEW SUGGESTION
          </NavLink>
        </li>
      )}
      {auth.isLogged && (
        <li>
          <button onClick={logOut} className="log-button">
            LOG OUT
          </button>
        </li>
      )}
      {auth.isLogged && (
        <li>
          <NavLink to="/new" exact>
            RECENT SUGGESTIONS
          </NavLink>
        </li>
      )}
      {auth.isLogged && (
        <li>
          <NavLink to="/ongoing" exact>
            CURRENT PROJECTS
          </NavLink>
        </li>
      )}
      {auth.isLogged && (
        <li>
          <NavLink to="/finished" exact>
            FINISHED
          </NavLink>
        </li>
      )}
      {auth.isLogged && (
        <li>
          <NavLink to="/states" exact>
            PROJECTS
          </NavLink>
        </li>
      )}
    </span>
  );
};

export default NavLinks;
