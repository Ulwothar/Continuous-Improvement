import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../shared/context/AuthContext';
import './LoadAll.css';

const LoadAll = (props) => {
  const [newProjects, setNewProjects] = useState({});
  const [ongoingProjects, setOngoingProjects] = useState({});
  const [finishedProjects, setFinishedProjects] = useState({});
  const auth = useContext(AuthContext);
  const status = ['new', 'ongoing', 'finished'];

  useEffect(() => {
    const getProjects = async () => {
      try {
        await fetch(`http://localhost:5000/api/projects/status/${status[0]}`, {
          method: 'GET',
          credentials: 'include',
        })
          .then((res) => {
            return res.json();
          })
          .then((result) => {
            if (result.message) {
              alert(result.message);
              auth.logout();
              window.location.reload();
            } else {
              setNewProjects(result.projects);
            }
          });
      } catch (error) {
        console.log(error);
        return null;
      }

      try {
        await fetch(`http://localhost:5000/api/projects/status/${status[1]}`, {
          method: 'GET',
          credentials: 'include',
        })
          .then((res) => {
            return res.json();
          })
          .then((result) => {
            if (result.message) {
              alert(result.message);
              auth.logout();
              window.location.reload();
            } else {
              setOngoingProjects(result.projects);
            }
          });
      } catch (error) {
        console.log(error);
        return null;
      }

      try {
        await fetch(`http://localhost:5000/api/projects/status/${status[2]}`, {
          method: 'GET',
          credentials: 'include',
        })
          .then((res) => {
            return res.json();
          })
          .then((result) => {
            if (result.message) {
              alert(result.message);
              auth.logout();
              window.location.reload();
            } else {
              setFinishedProjects(result.projects);
            }
          });
      } catch (error) {
        console.log(error);
        return null;
      }
    };
    getProjects();
  }, [auth]);

  if (
    newProjects.length === undefined ||
    ongoingProjects.length === undefined ||
    finishedProjects.length === undefined
  ) {
    return (
      <div className="loading-div">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="all-projects-container">
      <div className="new-projects-container">
        <h2>New Suggestions</h2>
        <hr />
        {newProjects.map(({ id, title }) => (
          <div className="title-window" key={id}>
            <NavLink to={`/states/${id}`} className="states-links">
              <h3>{title}</h3>
            </NavLink>
          </div>
        ))}
      </div>
      <div className="ongoing-projects-container">
        <h2>Ongoing Projects</h2>
        <hr />
        {ongoingProjects.map(({ id, title }) => (
          <div className="title-window" key={id}>
            <NavLink to={`/states/${id}`} className="states-links">
              <h3>{title}</h3>
            </NavLink>
          </div>
        ))}
      </div>
      <div className="finished-projects-container">
        <h2>Finished Projects</h2>
        <hr />
        {finishedProjects.map(({ id, title }) => (
          <div className="title-window" key={id}>
            <NavLink to={`/states/${id}`} className="states-links">
              <h3>{title}</h3>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadAll;
