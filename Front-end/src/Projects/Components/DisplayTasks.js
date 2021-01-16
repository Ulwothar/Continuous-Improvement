import React from 'react';
import ReactDOM from 'react-dom';

const DisplayTasks = (props) => {
  const taskId = props.id;
  const { projectId, status, description, date, title } = props;
  console.log(props);

  const createNewDiv = (
    <div className="title-window">
      <h3>{title}</h3>
    </div>
  );

  return ReactDOM.createPortal(
    createNewDiv,
    document.getElementsByClassName(`task-status-${status}`)[0],
  );
  //   document
  //     .getElementsByClassName(`task-status-${status}`)[0]
  //     .appendChild(createNewDiv);
  // <div>
  //   <h2>title</h2>
  //   <p>status</p>
  //   <p>date</p>
  //   <p>description</p>
  // </div>
};

export default DisplayTasks;
