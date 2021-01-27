import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { DatePicker } from 'react-rainbow-components';
import { Draggable } from 'react-beautiful-dnd';
import Modal from '../../shared/UIComponents/Modal';
import DisplayActivities from './DisplayActivities';
import './DisplayTasks.css';

const DisplayTasks = (props) => {
  const taskId = props.id;
  const {
    id,
    status,
    description,
    startDate,
    finishDate,
    title,
    index,
  } = props;

  const [showFullTask, setShowFullTask] = useState(false);
  const [enableEditDescription, setEnableEditDescription] = useState(false);
  const [descriptionText, setDescriptionText] = useState(description);
  const [startDateState, setStartDateState] = useState(
    startDate ? startDate : new Date().toString().slice(0, 24),
  );
  const [finishDateState, setFinishDateState] = useState(
    finishDate ? finishDate : new Date().toString().slice(0, 24),
  );

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
    <>
      <Draggable key={id} draggableId={id} index={index}>
        {(provided) => (
          <div
            className="title-window"
            onClick={showTask}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}>
            <h3>{title}</h3>
          </div>
        )}
      </Draggable>
      <Modal
        show={showFullTask}
        onCancel={hideTask}
        header={title}
        contentClass="modal-content-wrapper"
        footer={
          <React.Fragment>
            {/* <button type="submit" className="modal-cancel-button">
              CREATE TASK
            </button> */}
            <button
              type="button"
              onClick={deleteTask}
              className="task-delete-button">
              DELETE
            </button>
          </React.Fragment>
        }>
        <div className="content-container">
          <div className="task-dates">
            <span>
              <h4>Start Date: </h4>
              {/* <h5>{startDate}</h5>*/}

              <DatePicker
                className="start-date-picker"
                value={startDateState}
                onChange={(value) => setStartDateState(value)}
                label=""
                formatStyle="large"
              />
            </span>
            <span>
              <h4>Finish Date: </h4>
              <DatePicker
                className="start-date-picker"
                value={finishDateState}
                onChange={(value) => setFinishDateState(value)}
                label=""
                formatStyle="large"
              />
            </span>
          </div>
          <div className="task-description">
            <span>
              <h4>Description: </h4>
              <br />
              <textarea
                disabled={!enableEditDescription}
                value={descriptionText}
                onChange={changeDescription}></textarea>
              <button
                type="button"
                className={
                  !enableEditDescription
                    ? 'description-edit-button'
                    : 'description-save-button'
                }
                onClick={
                  !enableEditDescription ? editDescription : saveDescription
                }>
                {!enableEditDescription ? 'EDIT' : 'SAVE'}
              </button>
            </span>
          </div>
        </div>
        {/* <div className="task-activities">
          <span>
            <h4>Activities: </h4>
            <textarea placeholder="Add new activity here"></textarea>
            <button type="button" className="add-activity-button">
              SAVE
            </button>
          </span>
        </div> */}
        <DisplayActivities id={id} />
      </Modal>
    </>
  );

  //   return ReactDOM.createPortal(
  //     createNewDiv,
  //     document.getElementsByClassName(`task-status-${status}`)[0],
  //   );

  return createNewDiv;
};

export default DisplayTasks;
