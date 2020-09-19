import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';

const NavLinks = (props) => {
  return (
    <span className="nav-links">
      <li>
        <NavLink to="/" exact>
          NEW SUGGESTION
        </NavLink>
      </li>
      <li>
        <NavLink to="/authenticate" exact>
          LOG IN
        </NavLink>
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
    </span>
  );
};

export default NavLinks;
