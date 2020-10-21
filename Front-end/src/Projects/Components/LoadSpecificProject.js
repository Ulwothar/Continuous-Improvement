import React, { useState, useEffect } from 'react';

import DisplayProject from './DisplayProject';

const LoadSpecificProject = (props) => {
  const [specificProject, setSpecificProject] = useState([]);
  const id = props.id;
  useEffect(() => {
    fetch(`http://localhost:5000/api/projects/${id}`)
      .then((res) => res.json())
      .then((result) => {
        setSpecificProject([result.project]);
        //console.log(result.project);
      });
  }, [id]);

  //   useEffect(() => {
  //     fetch(`http://localhost:5000/api/comments/${id}`)
  //       .then((res) => res.json())
  //       .then((result) => {
  //         if (result.comment) {
  //           const comment = result.comment;
  //           setSpecificProject(...specificProject, [comment]);
  //         } else {
  //           const comment = result.message;
  //           setSpecificProject(...specificProject, [comment]);
  //         }

  //         //console.log(result.project);
  //       });
  //   }, [id]);
  //console.log(specificProject);

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
      comment={project.comment}
    />
  ));
};

export default LoadSpecificProject;
