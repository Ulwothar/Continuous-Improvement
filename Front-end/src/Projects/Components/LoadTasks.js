import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import DisplayTasks from './DisplayTasks';
import './LoadTasks.css';

const LoadTasks = (props) => {
  const [projectTasks, setProjectsTasks] = useState([]);
  const id = props.id;
  useEffect(() => {
    fetch(`http://localhost:5000/api/tasks/${id}`, {
      credentials: 'include',
    })
      .then((res) => {
        // console.log(res.status);
        return res.json();
      })
      .then((result) => {
        // console.log(result);
        if (!result.tasks) {
          setProjectsTasks(result);
        } else {
          setProjectsTasks(result.tasks);
        }
      });
  }, [id]);

  if (projectTasks.message) {
    //alert(projectTasks.message);
    return (
      <div className="tasks-container">
        <div className="task-status-todo">
          <h2>To Do:</h2>
          <hr />
        </div>
        <div className="task-status-ongoing">
          <h2>Ongoing:</h2>
          <hr />
        </div>
        <div className="task-status-done">
          <h2>Done:</h2>
          <hr />
        </div>
      </div>
    );
  }

  console.log(projectTasks);
  //   return <p>Let's make it work!</p>;

  return (
    <div className="tasks-container">
      <div className="task-status-todo">
        <h2>To Do:</h2>
        <hr />
      </div>
      <div className="task-status-ongoing">
        <h2>Ongoing:</h2>
        <hr />
      </div>
      <div className="task-status-done">
        <h2>Done:</h2>
        <hr />
      </div>
      {projectTasks.map((task) => (
        <DisplayTasks
          key={task._id}
          id={task._id}
          projectId={task.projectId}
          status={task.status}
          title={task.title}
          description={task.description}
          date={task.date}
        />
      ))}
    </div>
  );
};

export default LoadTasks;
