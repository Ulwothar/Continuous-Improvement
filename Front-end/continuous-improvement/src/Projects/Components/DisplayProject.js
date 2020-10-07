import React, { useState } from 'react';
import Select from 'react-select';

import { statusSelect } from '../../shared/UIComponents/form-select';
import './DisplayProject.css';

const DisplayProject = (props) => {
  const [value, setValue] = useState(props.status);

  const statusOptions = statusSelect();
  return (
    <div className="project-window">
      <h3 className="suggestion-title">{props.title}</h3>
      <p className="suggestion-date">{props.date}</p>
      <form className="modify-project-form">
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
          Status:
          <Select
            className="status-select"
            options={statusOptions}
            defaultValue={{ label: value, value: value }}></Select>
        </label>
        <div className="suggestion-description">
          <h4 className="description-label">Current situation:</h4>
          <p className="description-text">{props.currentSituation}</p>
          <h4 className="description-label">Improvement suggestion:</h4>
          <p className="description-text">{props.improvementSuggestion}</p>
          <h4 className="description-label">Comments:</h4>
          <p className="description-text">{props.comments}</p>
        </div>
      </form>
    </div>
  );
};

export default DisplayProject;
