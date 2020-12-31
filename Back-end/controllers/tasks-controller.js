import { validationResult } from 'express-validator';

import Task from '../models/task';

export const showTasks = async (req, res, next) => {
  const projectId = req.params.pid;

  let tasks;
  try {
    tasks = await Task.find({ projectId: projectId });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Something went wrong, could not find any tasks.' });
  }

  if (tasks.length === 0) {
    res.json('There are no tasks for this project.');
  } else {
    res.json({
      tasks: tasks.map((task) => task.toObject({ getters: true })),
    });
  }
};

export const addTask = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      res
        .status(422)
        .json({ message: 'Invalid inputs passed, please check your data.' }),
    );
  }

  const projectId = req.params.pid;
  const { title, description, date } = req.body;

  const createdTask = new Task({
    projectId,
    title,
    description,
    date,
  });

  try {
    await createdTask.save();
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }

  res.status(201).json(createdTask);
};

export const deleteTask = async (req, res, next) => {
  const id = req.params.tid;
  let task;
  try {
    task = await Task.findOne({ _id: id });
    console.log(task);
  } catch (error) {
    console.log(error);
    res.status(410).json({
      message: 'This task does not exist. Check your data and try again.',
    });
  }

  if (!task) {
    return res.status(410).json({
      message: 'This task does not exist. Check your data and try again.',
    });
  }

  try {
    await Task.deleteOne({ _id: id });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        'Internal server error, please try again. If the problem persist, please contact your admin.',
    });
  }
  res.status(200).json({ message: 'Task deleted successfully' });
};
