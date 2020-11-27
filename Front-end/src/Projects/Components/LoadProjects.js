import React, { useState, useEffect } from 'react';

import Preview from './Preview';
//import DisplayProject from './DisplayProject';
//import SavedProjects from './SavedProjects';
import './LoadProjects.css';

const LoadProjects = (props) => {
  const [projects, setProjects] = useState([]);
  const status = props.status;

  useEffect(() => {
    fetch(`http://localhost:5000/api/projects/status/${status}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => {
        //console.log(res);
        return res.json();
      })
      .then((result) => {
        setProjects(result.projects);
        //console.log(result);
      });
  }, [status]);

  //console.log(document.cookie);
  return projects.map((project) => (
    <Preview
      key={project._id}
      id={project._id}
      title={project.title}
      name={project.name}
      department={project.department}
      shift={project.shift}
      type={project.type}
      date={project.date}
      currentSituation={project.currentSituation}
      improvementSuggestion={project.improvementSuggestion}
      comments={project.comments}
    />
  ));
};

export default LoadProjects;
