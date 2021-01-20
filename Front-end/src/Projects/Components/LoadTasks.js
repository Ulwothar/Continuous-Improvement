import React, { useState, useEffect } from 'react';
import DisplayTasks from './DisplayTasks';
import CreateTask from './CreateTask';
import Modal from '../../shared/UIComponents/Modal';
import './LoadTasks.css';

const LoadTasks = (props) => {
  const id = props.id;

  const [projectTasks, setProjectsTasks] = useState([]);

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

  if (!projectTasks.message) {
    //alert(projectTasks.message);
    return (
      <div className="tasks-container">
        <div className="task-status-todo">
          <h2>To Do:</h2>
          <hr />
          <CreateTask status="todo" id={id} />
          <hr />
        </div>
        <div className="task-status-ongoing">
          <h2>Ongoing:</h2>
          <hr />
          <CreateTask status="ongoing" id={id} />
          <hr />
        </div>
        <div className="task-status-done">
          <h2>Done:</h2>
          <hr />
          <CreateTask status="done" id={id} />
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
            startDate={task.startDate}
            finishDate={task.finishDate}
          />
        ))}
      </div>
    );
  } else {
    return (
      <div className="tasks-container">
        <div className="task-status-todo">
          <h2>To Do:</h2>
          <hr />
          <CreateTask status="todo" id={id} />
          <hr />
        </div>
        <div className="task-status-ongoing">
          <h2>Ongoing:</h2>
          <hr />
          <CreateTask status="ongoing" id={id} />
          <hr />
        </div>
        <div className="task-status-done">
          <h2>Done:</h2>
          <hr />
          <CreateTask status="done" id={id} />
          <hr />
        </div>
      </div>
    );
  }
};

export default LoadTasks;
