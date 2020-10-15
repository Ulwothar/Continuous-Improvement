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
