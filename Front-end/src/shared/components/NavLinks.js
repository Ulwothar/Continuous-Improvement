import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../shared/context/AuthContext';
import UserLogout from '../../Users/Components/UserLogout';

import './NavLinks.css';

const NavLinks = () => {
  const auth = useContext(AuthContext);
  const Logout = () => UserLogout();
  // const LogOut = async ( ) => {
  //   logout();
  // };

  const LogOut = () => {
    Logout();
    auth.logout();
  };

  // const LogOut = () => {
  //   console.log('before calling UserLogout');
  //   UserLogout;
  //   console.log('after calling LogOut');
  // };
  return (
    <span className="nav-links">
      {auth.isLogged && (
        <>
          <li>
            <NavLink to="/" exact>
              NEW SUGGESTION
            </NavLink>
          </li>

          <li>
            <button onClick={LogOut} className="log-button">
              LOG OUT
            </button>
          </li>

          <li>
            <NavLink to="/new" exact>
              RECENT SUGGESTIONS
            </NavLink>
          </li>

          <li>
            <NavLink to="/ongoing" exact>
              CURRENT PROJECTS
            </NavLink>
          </li>

          <li>
            <NavLink to="/finished" exact>
              FINISHED
            </NavLink>
          </li>

          <li>
            <NavLink to="/states" exact>
              PROJECTS
            </NavLink>
          </li>
        </>
      )}
    </span>
  );
};

export default NavLinks;
