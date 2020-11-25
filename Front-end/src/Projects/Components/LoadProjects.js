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
      headers: {
        accesstoken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6Ik1hdHQiLCJpYXQiOjE2MDYyNjQ0NDMsImV4cCI6MTYwNjI2NDQ3M30.uOsi7Ui1I-s8yAAflIngk9K0hGKYppqPGEce2NEtPdg',
        refreshtoken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6Ik1hdHQiLCJpYXQiOjE2MDU4Mjk0MzV9.kv3UcpSnZz3XZLpWDmlXIlzgBf2XW0PAQii0mrLhdoE',
        user: 'Matt',
      },
      credentials: 'same-origin',
    })
      .then((res) => res.json())
      .then((result) => {
        setProjects(result.projects);
        //console.log(status);
      });
  }, [status]);

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
