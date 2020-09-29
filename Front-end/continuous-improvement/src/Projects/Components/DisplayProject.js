import React from 'react';

import './DisplayProject.css';

const DisplayProject = (props) => {
  return (
    <div className="project-window">
      <h3 className="suggestion-title">{props.title}</h3>
      <p className="suggestion-date">{props.date}</p>
      <span className="suggestion-details">
        <label>
          Name:
          <p>{props.name}</p>
        </label>
        <label>
          Department:
          <p>{props.department}</p>
        </label>
        <label>
          Shift:
          <p>{props.shift}</p>
        </label>
        <label>
          Type:
          <p>{props.type}</p>
        </label>
      </span>
      <label>
        Status:<p>{props.status}</p>
      </label>
      <div className="suggestion-description">
        <h4 className="description-label">Current situation:</h4>
        <p className="description-text">{props.currentSituation}</p>
        <h4 className="description-label">Improvement suggestion:</h4>
        <p className="description-text">{props.improvementSuggestion}</p>
        <h4 className="description-label">Comments:</h4>
        <p className="description-text">{props.comments}</p>
      </div>
    </div>
  );
};

export default DisplayProject;
