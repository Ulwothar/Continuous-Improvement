import React from 'react';
import { NavLink } from 'react-router-dom';

import './Preview.css';

const Preview = (props) => {
  let link = '/projects/' + props.id;
  return (
    <div className="preview-window">
      <NavLink to={link} className="suggestion-preview-link">
        <div className="inner-window">
          <h3 className="preview-title">{props.title}</h3>
          <span>
            <p className="details">
              Author: {props.name} &emsp; Department: {props.department} &emsp;
              {props.date}
            </p>
          </span>
          <p>{props.currentSituation}</p>
        </div>
      </NavLink>
    </div>
  );
};

export default Preview;
