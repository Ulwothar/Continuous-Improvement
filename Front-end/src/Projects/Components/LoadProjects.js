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
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6Ik1hdGV1c3oiLCJpYXQiOjE2MDY1MTI5MDEsImV4cCI6MTYwNjUxMjkzMX0.G0agpUzi1y1oSnSBXc7wLmZuthEOrWa07m8CfFBVz34',
        refreshtoken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6Ik1hdGV1c3oiLCJpYXQiOjE2MDY1MTI5MDF9.7oAHVTmTznj4YWI3EKjEP_cC7Ngwf6L_E-wK6p96XM8',
        user: 'Mateusz',
      },
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
