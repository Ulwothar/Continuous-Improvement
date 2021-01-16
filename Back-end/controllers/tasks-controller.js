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
    res.json({ message: 'There are no tasks for this project.' });
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
  const { title, description, date, status } = req.body;

  const createdTask = new Task({
    projectId,
    title,
    description,
    date,
    status,
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
  let deletedTask;

  try {
    deletedTask = await Task.deleteOne({ _id: id });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        'Internal server error, please try again. If the problem persist, please contact your admin.',
    });
  }

  if (!deletedTask.n) {
    return res.status(410).json({ message: 'Error, task already deleted!' });
  }
  res.status(200).json({ message: 'Task deleted successfully' });
};

export const updateTitle = async (req, res, next) => {
  const id = req.params.tid;

  const title = req.body;

  if (!title.title) {
    return res.status(400).json({ message: 'No title provided!' });
  }

  try {
    await Task.findByIdAndUpdate(id, title, { useFindAndModify: false });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Could not modify this task, please try again.' });
  }

  res.status(201).json({ message: 'Title updated.' });
};

export const updateDescription = async (req, res, next) => {
  const id = req.params.tid;

  const description = req.body;

  console.log(description);

  if (!description.description) {
    return res.status(400).json({ message: 'No description provided!' });
  }

  try {
    await Task.findByIdAndUpdate(id, description, { useFindAndModify: false });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Could not modify this task, please try again.' });
  }

  res.status(201).json({ message: 'Description updated.' });
};

export const updateStatus = async (req, res, next) => {
  const id = req.params.tid;

  const status = req.body;

  if (!status.status) {
    return res.status(400).json({ message: 'No status provided!' });
  }

  try {
    await Task.findByIdAndUpdate(id, status, { useFindAndModify: false });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Could not modify this task, please try again.' });
  }

  res.status(201).json({ message: 'Status updated.' });
};
