import React, { useState } from 'react';
import { DatePicker } from 'react-rainbow-components';
import Modal from '../../shared/UIComponents/Modal';
import './CreateTask.css';

const CreateTask = (props) => {
  const { status, id } = props;
  let dummyTask = {
    title: '',
    startDate: '',
    finishDate: '',
    description: '',
    status: status,
  };
  const [addTaskModal, setAddTaskModal] = useState(false);
  const [newTask, setNewTask] = useState(dummyTask);
  const [startDateState, setStartDateState] = useState(
    Date().toString().slice(0, 24),
  );
  const [finishDateState, setFinishDateState] = useState(
    Date().toString().slice(0, 24),
  );

  const createTaskModal = () => {
    setAddTaskModal(true);
  };

  const cancelCreateTask = () => {
    setAddTaskModal(false);
  };

  const confimCreatingTask = async (event) => {
    event.preventDefault();
    try {
      await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          title: newTask.title,
          startDate: newTask.startDate,
          finishDate: newTask.finishDate,
          description: newTask.description,
          status: newTask.status,
        }),
      });
    } catch (error) {
      console.log(error);
    }
    setAddTaskModal(false);
    window.location.reload();
  };

  let thisName = '';

  const changeHandler = async (event) => {
    thisName = event.target.name;
    setNewTask({
      ...newTask,
      [thisName]: event.target.value,
    });
  };

  return (
    <React.Fragment>
      <div className="add-task" onClick={createTaskModal}>
        <h4>+ Add Task</h4>
      </div>
      <Modal
        show={addTaskModal}
        onCancel={cancelCreateTask}
        header="New Task"
        onSubmit={confimCreatingTask}
        footer={
          <React.Fragment>
            <button type="submit" className="modal-cancel-button">
              CREATE TASK
            </button>
            <button
              type="button"
              onClick={cancelCreateTask}
              className="modal-delete-button">
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
              onChange={changeHandler}
              required
            />
          </label>
          <label className="create-task-label">
            <p>Start date: </p>
            <DatePicker
              id="start-date-picker"
              className="new-task-date"
              value={startDateState}
              onChange={(value) => {
                setStartDateState(value);
                setNewTask({ ...newTask, startDate: value });
              }}
              label=""
              formatStyle="large"
            />
          </label>
          <label className="create-task-label">
            <p>Finish date: </p>
            <DatePicker
              id="start-date-picker"
              className="start-date-picker"
              value={finishDateState}
              onChange={(value) => {
                setFinishDateState(value);
                setNewTask({ ...newTask, finishDate: value });
              }}
              label=""
              formatStyle="large"
            />
          </label>
          <label className="create-task-description">
            <p>Description: </p>
            <textarea
              name="description"
              className="new-task-title"
              placeholder="Describe your task please..."
              onChange={changeHandler}
              required></textarea>
          </label>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default CreateTask;
