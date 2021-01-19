import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from '../../shared/UIComponents/Modal';
import './DisplayTasks.css';

const DisplayTasks = (props) => {
  const taskId = props.id;
  const {
    projectId,
    status,
    description,
    startDate,
    finishDate,
    title,
  } = props;

  const [showFullTask, setShowFullTask] = useState(false);
  const [enableEditDescription, setEnableEditDescription] = useState(false);
  const [descriptionText, setDescriptionText] = useState(description);

  const editDescription = () => {
    setEnableEditDescription(true);
  };

  const stopEditingDescription = () => {
    setEnableEditDescription(false);
  };

  const showTask = () => {
    setShowFullTask(true);
  };

  const hideTask = () => {
    setShowFullTask(false);
    setEnableEditDescription(false);
  };

  const changeDescription = (event) => {
    setDescriptionText(event.target.value);
  };

  const saveDescription = async () => {
    try {
      await fetch(`http://localhost:5000/api/tasks/description/${taskId}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ description: descriptionText }),
      }).then((res) => {
        console.log(res);
        return res;
      });
    } catch (error) {
      console.log(error);
    }
    setEnableEditDescription(false);
  };

  const deleteTask = async () => {
    try {
      await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        credentials: 'include',
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
        },
      });
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  };

  const createNewDiv = (
    <React.Fragment>
      <div className="title-window" onClick={showTask}>
        <h3>{title}</h3>
      </div>
      <Modal
        show={showFullTask}
        onCancel={hideTask}
        header={title}
        footer={
          <React.Fragment>
            {/* <button type="submit" className="modal-cancel-button">
              CREATE TASK
            </button> */}
            <button
              type="button"
              onClick={deleteTask}
              className="modal-delete-button">
              DELETE
            </button>
          </React.Fragment>
        }>
        <span>
          <p>Start Date: </p>
          <p>{startDate}</p>
        </span>
        <span>
          <p>Finish Date: </p>
          <p>{finishDate}</p>
        </span>
        <span>
          <h4>Description: </h4>
          <br />
          <textarea
            disabled={!enableEditDescription}
            value={descriptionText}
            onChange={changeDescription}></textarea>
          <button
            type="button"
            onClick={
              !enableEditDescription ? editDescription : saveDescription
            }>
            {!enableEditDescription ? 'Edit' : 'Save'}
          </button>
        </span>
        <span>
          <p>Activities: </p>
        </span>
      </Modal>
    </React.Fragment>
  );

  return ReactDOM.createPortal(
    createNewDiv,
    document.getElementsByClassName(`task-status-${status}`)[0],
  );
};

export default DisplayTasks;
