import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import DisplayProject from './DisplayProject';

const LoadSpecificProject = (props) => {
  const [specificProject, setSpecificProject] = useState([]);
  const id = props.id;
  useEffect(() => {
    fetch(`http://localhost:5000/api/projects/${id}`, {
      credentials: 'include',
    })
      .then((res) => {
        // console.log(res.status);
        return res.json();
      })
      .then((result) => {
        // console.log(result);
        if (!result.project) {
          setSpecificProject(result);
        } else {
          setSpecificProject([result.project]);
        }
      });
  }, [id]);

  if (specificProject.message) {
    alert(specificProject.message);
    return <Redirect to="/" />;
  }

  return specificProject.map((project) => (
    <DisplayProject
      key={project._id}
      id={project._id}
      status={project.status}
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

export default LoadSpecificProject;
