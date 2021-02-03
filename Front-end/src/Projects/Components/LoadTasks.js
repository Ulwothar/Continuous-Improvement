import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DisplayTasks from './DisplayTasks';
import CreateTask from './CreateTask';
import './LoadTasks.css';

const LoadTasks = (props) => {
  const id = props.id;

  const [projectTasks, setProjectsTasks] = useState([]);
  const [todoTasks, setTodoTasks] = useState([]);
  const [ongoingTasks, setOngoingTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [projectTitle, setProjectTitle] = useState('');

  let AllTasks;

  useEffect(() => {
    fetch(`http://localhost:5000/api/tasks/${id}`, {
      credentials: 'include',
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        if (!result.tasks) {
          setProjectsTasks(result);
        } else {
          let tasks = result.tasks;
          setProjectsTasks(result.tasks);
          setTodoTasks(tasks.filter((task) => task.status === 'todo'));
          setOngoingTasks(tasks.filter((task) => task.status === 'ongoing'));
          setDoneTasks(tasks.filter((task) => task.status === 'done'));
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

  const changeTaskStatus = async (taskStatus, prevStatus, changedTaskId) => {
    let movedTask;

    if (taskStatus !== prevStatus) {
      if (prevStatus === 'todo') {
        movedTask = todoTasks.filter((task) => task._id === changedTaskId);
        let newToDo = todoTasks.filter((task) => task._id !== changedTaskId);
        setTodoTasks(newToDo);
      } else if (prevStatus === 'ongoing') {
        movedTask = ongoingTasks.filter((task) => task._id === changedTaskId);
        let newOngoing = ongoingTasks.filter(
          (task) => task._id !== changedTaskId,
        );
        setOngoingTasks(newOngoing);
      } else if (prevStatus === 'done') {
        movedTask = doneTasks.filter((task) => task._id === changedTaskId);
        let newDone = doneTasks.filter((task) => task._id !== changedTaskId);
        setDoneTasks(newDone);
      }
      [movedTask[0].status] = movedTask.map(
        (task) => (task.status = taskStatus),
      );

      if (taskStatus === 'todo') {
        setTodoTasks([...todoTasks, ...movedTask]);
      } else if (taskStatus === 'ongoing') {
        setOngoingTasks([...ongoingTasks, ...movedTask]);
      } else if (taskStatus === 'done') {
        setDoneTasks([...doneTasks, ...movedTask]);
      }

      return movedTask;
    }

    return null;
  };

  const handleOnDragEnd = async (result) => {
    if (!result.destination) return;
    const taskStatus = result.destination.droppableId.slice(12);
    const prevStatus = result.source.droppableId.slice(12);
    const changedTaskId = result.draggableId;
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
    await changeTaskStatus(taskStatus, prevStatus, changedTaskId);
  };

  !projectTasks.message
    ? (AllTasks = (
        <div className="all-tasks-wrapper">
          <h3>{projectTitle}</h3>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className="tasks-container" key="tasks-container">
              <Droppable droppableId="task-status-todo" key="task-status-todo">
                {(provided) => (
                  <div
                    className="task-status-todo"
                    {...provided.droppableProps}
                    ref={provided.innerRef}>
                    <h2>To Do:</h2>
                    <hr />
                    <CreateTask status="todo" id={id} />
                    <hr />
                    {todoTasks ? (
                      todoTasks.map((task, index) =>
                        task.id && task.status === 'todo' ? (
                          <DisplayTasks
                            key={task._id}
                            id={task._id}
                            index={index}
                            projectId={task.projectId}
                            status={task.status}
                            title={task.title}
                            description={task.description}
                            startDate={task.startDate}
                            finishDate={task.finishDate}
                          />
                        ) : (
                          <></>
                        ),
                      )
                    ) : (
                      <></>
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <Droppable
                droppableId="task-status-ongoing"
                key="task-status-ongoing">
                {(provided) => (
                  <div
                    className="task-status-ongoing"
                    {...provided.droppableProps}
                    ref={provided.innerRef}>
                    <h2>Ongoing:</h2>
                    <hr />
                    <CreateTask status="ongoing" id={id} />
                    <hr />
                    {ongoingTasks ? (
                      ongoingTasks.map((task, index) =>
                        task.id && task.status === 'ongoing' ? (
                          <DisplayTasks
                            key={task._id}
                            id={task._id}
                            index={index}
                            projectId={task.projectId}
                            status={task.status}
                            title={task.title}
                            description={task.description}
                            startDate={task.startDate}
                            finishDate={task.finishDate}
                          />
                        ) : (
                          <></>
                        ),
                      )
                    ) : (
                      <></>
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <Droppable droppableId="task-status-done" key="task-status-done">
                {(provided) => (
                  <div
                    className="task-status-done"
                    {...provided.droppableProps}
                    ref={provided.innerRef}>
                    <h2>Done:</h2>
                    <hr />
                    <CreateTask status="done" id={id} />
                    <hr />
                    {doneTasks ? (
                      doneTasks.map((task, index) =>
                        task.id && task.status === 'done' ? (
                          <DisplayTasks
                            key={task._id}
                            id={task._id}
                            index={index}
                            projectId={task.projectId}
                            status={task.status}
                            title={task.title}
                            description={task.description}
                            startDate={task.startDate}
                            finishDate={task.finishDate}
                          />
                        ) : (
                          <></>
                        ),
                      )
                    ) : (
                      <></>
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </DragDropContext>
        </div>
      ))
    : //   } else {
      (AllTasks = (
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
      ));
  //   }
  return AllTasks;
};

export default LoadTasks;
