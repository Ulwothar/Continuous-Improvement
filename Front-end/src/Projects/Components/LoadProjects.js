import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../shared/context/AuthContext';

import Preview from './Preview';
//import DisplayProject from './DisplayProject';
//import SavedProjects from './SavedProjects';
import './LoadProjects.css';

const LoadProjects = (props) => {
  const [projects, setProjects] = useState([]);
  const status = props.status;
  const auth = useContext(AuthContext);

  useEffect(() => {
    let isMounted = true;
    fetch(process.env.REACT_APP_GET_PROJECTS_BY_STATUS + status, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        if (isMounted && result.message) {
          alert(result.message);
          auth.logout();
          window.location.reload();
        } else if (isMounted) {
          setProjects(result.projects);
        }
        return () => {
          isMounted = false;
        };
      });
  }, [status, auth]);

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
