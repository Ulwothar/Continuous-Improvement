import React, { useState, useEffect } from 'react';
import DisplayTasks from './DisplayTasks';
import Modal from '../../shared/UIComponents/Modal';
import './LoadTasks.css';

const LoadTasks = (props) => {
  const [projectTasks, setProjectsTasks] = useState([]);
  const [addTaskModal, setAddTaskModal] = useState(false);
  const id = props.id;

  const createTaskModal = () => {
    setAddTaskModal(true);
  };

  const cancelCreateTask = () => {
    setAddTaskModal(false);
  };

  const confimCreatingTask = () => {
    setAddTaskModal(false);
  };

  const addTaskButton = (
    <React.Fragment>
      <div className="add-task" onClick={createTaskModal}>
        <h4>+ Add Task</h4>
      </div>
      <Modal
        show={addTaskModal}
        onCancel={cancelCreateTask}
        header="New Task"
        footer={
          <React.Fragment>
            <button
              onClick={confimCreatingTask}
              className="modal-cancel-button">
              CREATE TASK
            </button>
            <button onClick={cancelCreateTask} className="modal-delete-button">
              CANCEL
            </button>
          </React.Fragment>
        }>
        <div className="create-task-container">
          <label className="create-task-label">
            <p>Task title: </p>
            <input
              name="title"
              className="new-task-title"
              placeholder="Title..."
              type="text"
            />
          </label>
          <label className="create-task-label">
            <p>Start date: </p>
            <input
              name="startDate"
              className="new-task-date"
              placeholder="Need a date picker..."
              type="text"
            />
          </label>
          <label className="create-task-label">
            <p>Finish date: </p>
            <input
              name="finishDate"
              className="new-task-date"
              placeholder="Need a date picker..."
              type="text"
            />
          </label>
          <label className="create-task-description">
            <p>Description: </p>
            <textarea
              name="description"
              className="new-task-title"
              placeholder="Describe your task please..."></textarea>
          </label>
        </div>
      </Modal>
    </React.Fragment>
  );

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
          {addTaskButton}
          <hr />
        </div>
        <div className="task-status-ongoing">
          <h2>Ongoing:</h2>
          <hr />
          {addTaskButton}
          <hr />
        </div>
        <div className="task-status-done">
          <h2>Done:</h2>
          <hr />
          {addTaskButton}
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
  } else {
    return (
      <div className="tasks-container">
        <div className="task-status-todo">
          <h2>To Do:</h2>
          <hr />
          {addTaskButton}
          <hr />
        </div>
        <div className="task-status-ongoing">
          <h2>Ongoing:</h2>
          <hr />
          {addTaskButton}
          <hr />
        </div>
        <div className="task-status-done">
          <h2>Done:</h2>
          <hr />
          {addTaskButton}
          <hr />
        </div>
      </div>
    );
  }

  //   console.log(projectTasks);
  //   return <p>Let's make it work!</p>;
};

export default LoadTasks;
