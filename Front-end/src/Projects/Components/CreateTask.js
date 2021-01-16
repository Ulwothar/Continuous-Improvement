import React from 'react';
import ReactDOM from 'react-dom';

const CreateTask = (props) => {
  const status = props.status;
  const addTaskButton = (
    <div className="title-window">
      <h3>{status}</h3>
    </div>
  );

  //   return ReactDOM.createPortal(
  //     addTaskButton,
  //     document.getElementsByClassName(`task-status-${status}`),
  //   );

  return addTaskButton;
};

export default CreateTask;
