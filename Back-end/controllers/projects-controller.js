import mongose from 'mongoose';

import HttpError from '../models/http-error';
import Project from '../models/project';

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
    const error = new HttpError(`There are no ${status} places!`, 404);
  }
  res.json({
    projects: projects.map((project) => project.toObject({ getters: true })),
  });
};
