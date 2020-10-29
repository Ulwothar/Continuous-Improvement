import { validationResult } from 'express-validator';

import HttpError from '../models/http-error';
import Project from '../models/project';
import Comment from '../models/comment';

export const getProjectById = async (req, res, next) => {
  const projectId = req.params.pid;
  let project;
  try {
    project = await Project.findById(projectId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a project',
      500,
    );
    console.log(err);
    return next(error);
  }

  if (!project) {
    const error = new HttpError(
      'Could not find a project with the provided ID',
      404,
    );
    return next(error);
  }

  res.json({ project: project.toObject({ getters: true }) });
};

export const getProjectsByStatus = async (req, res, next) => {
  const status = req.params.status;
  let projects;
  try {
    projects = await Project.find({ status: status });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find any projects!',
      500,
    );
    return next(error);
  }

  if (projects.length === 0) {
    const error = new HttpError(`There are no ${status} projects!`, 404);
  }
  res.json({
    projects: projects.map((project) => project.toObject({ getters: true })),
  });
};

export const deleteProject = async (req, res, next) => {
  const projectId = req.params.pid;

  try {
    await Project.deleteOne({ _id: projectId });
    await Comment.deleteMany({ projectId: projectId });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete this project!',
      500,
    );

    next(error);
  }

  res.status(200).json({ message: 'Project deleted!' });
};

export const changeStatus = async (req, res, next) => {
  const status = req.body;
  const projectId = req.params.pid;
  let updatedProject;
  try {
    updatedProject = await Project.findByIdAndUpdate(projectId, status, {
      new: true,
      useFindAndModify: false,
    });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, updating status failed. Please try again.',
      500,
    );
    return next(error);
  }

  res.status(200).json({ project: updatedProject.toObject({ getters: true }) });
};

export const createProject = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422),
    );
  }

  const {
    title,
    name,
    department,
    shift,
    type,
    status,
    currentSituation,
    improvementSuggestion,
    comments,
    date,
  } = req.body;

  const createdProject = new Project({
    title,
    name,
    department,
    shift,
    type,
    status,
    currentSituation,
    improvementSuggestion,
    comments,
    date,
  });

  try {
    await createdProject.save();
  } catch (err) {
    const error = new HttpError(
      'Creating project failed, please try again.',
      401,
    );
    console.log(err);
    return next(error);
  }

  res.status(201).json(createdProject);
};
