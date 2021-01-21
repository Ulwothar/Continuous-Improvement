import React, { useState, useEffect, useReducer } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DisplayTasks from './DisplayTasks';
import CreateTask from './CreateTask';
import './LoadTasks.css';

const LoadTasks = (props) => {
  const id = props.id;

  const [projectTasks, setProjectsTasks] = useState([]);
  const [projectTitle, setProjectTitle] = useState('');

  const dragReducer = (state, action) => {
    return state;
  };

  const [state, dispatch] = useReducer(dragReducer, { items: projectTasks });

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

    fetch(`http://localhost:5000/api/projects/${id}`, {
      credentials: 'include',
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        if (!result.project) {
          setProjectTitle(result);
        } else {
          setProjectTitle([result.project.title]);
        }
      });
  }, [id]);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    console.log(result.destination.droppableId.slice(12));
    let taskStatus = result.destination.droppableId.slice(12);
    let changedTaskId = result.draggableId;
    try {
      fetch(`http://localhost:5000/api/tasks/status/${changedTaskId}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ status: taskStatus }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (!projectTasks.message) {
    //alert(projectTasks.message);
    return (
      <div className="all-tasks-wrapper">
        <h3>{projectTitle}</h3>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <div className="tasks-container">
            <Droppable droppableId="task-status-todo">
              {(provided) => (
                <div
                  className="task-status-todo"
                  {...provided.droppableProps}
                  ref={provided.innerRef}>
                  <h2>To Do:</h2>
                  <hr />
                  <CreateTask status="todo" id={id} />
                  <hr />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <Droppable droppableId="task-status-ongoing">
              {(provided) => (
                <div
                  className="task-status-ongoing"
                  {...provided.droppableProps}
                  ref={provided.innerRef}>
                  <h2>To Do:</h2>
                  <hr />
                  <CreateTask status="ongoing" id={id} />
                  <hr />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <Droppable droppableId="task-status-done">
              {(provided) => (
                <div
                  className="task-status-done"
                  {...provided.droppableProps}
                  ref={provided.innerRef}>
                  <h2>To Do:</h2>
                  <hr />
                  <CreateTask status="done" id={id} />
                  <hr />

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            {/* <div className="task-status-ongoing">
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
            </div> */}
            {/* {projectTasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <DisplayTasks
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    id={task._id}
                    projectId={task.projectId}
                    status={task.status}
                    title={task.title}
                    description={task.description}
                    startDate={task.startDate}
                    finishDate={task.finishDate}
                  />
                )}
              </Draggable>
            ))} */}
            {/* <Droppable droppableId="task-status-shuffle">
              {(provided) => (
                <div
                  className="task-status-shuffle"
                  {...provided.droppableProps}
                  ref={provided.innerRef}>
                  {projectTasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}>
                          {/* {task.title} */}
            {/* <DisplayTasks
                            innerRef={provided.innerRef}
                            provided={provided}
                            id={task._id}
                            projectId={task.projectId}
                            status={task.status}
                            title={task.title}
                            description={task.description}
                            startDate={task.startDate}
                            finishDate={task.finishDate}
                          />
                        </div> */}
            {/* )} */}
            {/* </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            // </Droppable> */}

            <Droppable droppableId="task-loader">
              {(provided) => (
                <div
                  className="task-loader"
                  {...provided.droppableProps}
                  ref={provided.innerRef}>
                  {projectTasks.map((task, index) => (
                    <DisplayTasks
                      key={task.id}
                      id={task._id}
                      index={index}
                      projectId={task.projectId}
                      status={task.status}
                      title={task.title}
                      description={task.description}
                      startDate={task.startDate}
                      finishDate={task.finishDate}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </div>
    );
  } else {
    return (
      <div className="all-tasks-wrapper">
        <h3>{projectTitle}</h3>
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
      </div>
    );
  }
};

export default LoadTasks;
